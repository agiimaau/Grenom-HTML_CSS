const express=require("express");
const app =express();
const {pool} = require('./dbConfig');
app.use(express.static('public'));
const bcrypt = require("bcrypt");

const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport"); 
const cookieParser = require('cookie-parser');


const configurePassport = require("./passportConfig");
configurePassport(passport);
const multer = require('multer');
const upload = multer();



const PORT=process.env.PORT || 4000;
//app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());

app.use(passport.session());
app.use(flash());


app.get('/', checkNotAuthenticated,(req, res) => {
    res.sendFile('/view/index.html', {root: __dirname })
});

app.get('/sign-up', checkAuthenticated,(req, res) => {
    res.sendFile('/view/sign-up.html', {root: __dirname })
});
app.get('/log-in', checkAuthenticated, (req, res) => {
    res.sendFile('/view/log-in.html', {root: __dirname })
});

app.get('/book-exchange',(req, res) => {
    res.sendFile('/view/book-exchange.html', {root: __dirname })
    
});
app.get('/book-sale', (req, res) => {
    res.sendFile('/view/book-sale.html', {root: __dirname })
});
app.get('/cart', (req, res) => {
    res.sendFile('/view/cart.html', {root: __dirname })
});
app.get('/minii-bulan',checkNotAuthenticated, (req, res) => {
    res.sendFile('/view/MiniiBulan.html', {root: __dirname })
});
app.get('/contact-us',checkNotAuthenticated, (req, res) => {
    res.sendFile('/view/Contact-us.html', {root: __dirname })
});
app.get('/log-out', (req,res) => {
    req.logOut(function(err) {
        if (err) { return next(err); }
        req.flash("success_msg", "You have successfully logged out.");
        res.redirect("/log-in");
    });
});
app.get("/bookdata", async (req, res) => {
    try {
        const query = `
            SELECT eb.*, 
                   u.UserPicture AS PublisherPicture,
                   u.LastName AS PublisherLastName,
                   u.FirstName AS PublisherFirstName
            FROM public.ExchangeBooks AS eb
            JOIN public.Users AS u ON eb.UserID = u.UserID;
        `;
        const data = await pool.query(query);
        //console.log(data.rows);
        res.status(200).json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/bookdata-sale", async (req, res) => {
    try {
        const query = `
            SELECT eb.*, 
                   u.UserPicture AS PublisherPicture,
                   u.LastName AS PublisherLastName,
                   u.FirstName AS PublisherFirstName
            FROM public.SaleBooks AS eb
            JOIN public.Users AS u ON eb.UserID = u.UserID;
        `;
        const data = await pool.query(query);
        
        res.status(200).json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post('/addExchangeBook', upload.none(),async(req,res)=>{
    let { booknameex, bookauthor, bookwear,catergory_lists_ex, book_addition_info_ex, bookdate, bookpage} = req.body;
    let errorsOfBE=[];
    let starRating = req.body.starsod;
    console.log({
        booknameex, bookauthor, bookwear,catergory_lists_ex, book_addition_info_ex,starRating,bookdate, bookpage
    });
    userID = req.user.userid;
    if ( !booknameex || !bookauthor || !bookwear || !catergory_lists_ex || !book_addition_info_ex || !bookdate || !bookpage) {
        errorsOfBE.push({ message: "Бүх талбарыг бөглөнө үү." });
    }
    if (errorsOfBE.length > 0) {
        return res.json({ errorsOfBE: errorsOfBE });
    }
    else{
        pool.query(
            `INSERT INTO ExchangeBooks (UserID, StarRate, BookName, Category,Author, Wear, Pages, PublishedDate, Descrip )
            VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9)
            RETURNING UserID`, [userID,parseInt(starRating),booknameex,[catergory_lists_ex],bookauthor,bookwear,parseInt(bookpage),parseInt(bookdate),book_addition_info_ex ], (err, result) =>{
                if(err){
                    throw err;
                }
                console.log(result.rows);
                res.json({ success: true });
            }
        )
    
    }
   
});
app.post('/addSaleBook', upload.none(),async(req,res)=>{
    let { booknamesa, bookauthor, bookwear,bookfprice, booklprice,catergory_lists_sale, book_addition_info, bookdate, bookpage} = req.body;
    let errorsOfSB=[];
    let starRating = req.body.starsod;
    console.log({
        booknamesa, bookauthor, bookwear, catergory_lists_sale, book_addition_info,starRating,bookdate, bookpage,bookfprice, booklprice
    });
    userID = req.user.userid;
    if ( !booknamesa || !bookauthor || !bookwear || !catergory_lists_sale || !book_addition_info || !bookdate || !bookpage || !bookfprice || !booklprice) {
        errorsOfSB.push({ message: "Бүх талбарыг бөглөнө үү." });
    }
    if (errorsOfSB.length > 0) {
        return res.json({ errorsOfSB: errorsOfSB });
    }
    else{
        pool.query(
            `INSERT INTO SaleBooks (UserID, StarRate, OldPrice, NewPrice, BookName, Category,Author, Wear, Pages, PublishedDate, Descrip )
            VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9,$10,$11)
            RETURNING UserID`, [userID,parseInt(starRating),parseInt(bookfprice), parseInt(booklprice), booknamesa,[catergory_lists_sale],bookauthor,bookwear,parseInt(bookpage),parseInt(bookdate),book_addition_info], (err, result) =>{
                if(err){
                    throw err;
                }
                console.log(result.rows);
                res.json({ success: true });
            }
        )
    
    }
   
});

app.post('/recco',upload.none(), async(req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        // Handle the case where the user is not logged in
        return res.status(401).json({ error: "User not authenticated" });
    }
    console.log(req.body);
    let { name, email, rec } = req.body;
    let errorsOfRec = [];
    console.log({
        name,
        email,
        rec
    });
    let userID = req.user.userid; // Assuming the UserID is stored in req.user
    console.log(userID);

    if (!name || !email || !rec) {
        errorsOfRec.push({ message: "Бүх талбарыг бөглөнө үү." });
    }
    if (errorsOfRec.length > 0) {
        return res.json({ errorsOfRec: errorsOfRec });
    }
    else{
        pool.query(
            `INSERT INTO Recco (FName, UserID, Email, Recco)
            VALUES ($1, $2, $3, $4)
            RETURNING UserID`, [name, userID, email, rec], (err, result) =>{
                if(err){
                    throw err;
                }
                console.log(result.rows);
                res.json({ success: true });
            }
        )
    }

    
    
});


app.post('/sign-up', upload.none(), async(req, res) => {
    let { lastName, firstName, phoneNumber, password } = req.body;
    let errors = [];
    console.log({
        lastName,
        firstName,
        phoneNumber,
        password
    });

    if (!lastName || !firstName || !phoneNumber || !password) {
        errors.push({ message: "Бүх талбарыг бөглөнө үү." });
      }
      if (password && password.length < 6) {
        errors.push({ message: "Нууц үг дор хаяж 6 тэмдэгт байх ёстой." });
    }

    if (errors.length > 0) {
        res.json({ errors: errors });
    }
      else{
        let hashed = await bcrypt.hash(password, 10);
        console.log(hashed);
        pool.query(
            `SELECT * FROM public.Users 
            WHERE PhoneNumber = $1`, 
            [phoneNumber],
            (err, results) => {
                if(err){
                    throw err;
                }
                console.log("reaches here");
                console.log(results.rows);

                if(results.rows.length > 0) {  
                    errors.push({ message: "Энэ дугаар аль хэдийн бүртгэгдсэн байна." });
                    res.json({ errors: errors });
                }else{
                    pool.query(
                        `INSERT INTO Users (LastName, FirstName, PhoneNumber, PasswordHash)
                        VALUES ($1, $2, $3, $4)
                        RETURNING UserID, PasswordHash`, [lastName,firstName, phoneNumber, hashed], (err, result) =>{
                                if(err){
                                    throw err;
                                    console.log("error baina genuu");
                                }
                                console.log(result.rows);
                                //req.flash('success_msg', "Registred!");
                                //res.redirect('/log-in');
                                res.json({ success: true });
                        }
                    )
                }
            }
        );
      }
});
app.post(
    '/log-in',
    passport.authenticate("local", {
      successRedirect: '/',
      failureRedirect: '/log-in',
      failureFlash: true
    })
  );
  
function checkAuthenticated(req, res, next) {
    console.log("reaches check authen");
      if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      next();
    }
    
    function checkNotAuthenticated(req, res, next) {
      console.log("reaches check not authen");
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/log-in');
    }
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});