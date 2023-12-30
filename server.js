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
app.get('/book-sale', checkNotAuthenticated,(req, res) => {
    res.sendFile('/view/book-sale.html', {root: __dirname })
});
app.get('/cart', (req, res) => {
    res.sendFile('/view/cart.html', {root: __dirname })
});
app.get('/minii-bulan',checkNotAuthenticated, (req, res) => {
    res.sendFile('/view/MiniiBulan.html', {root: __dirname })
});
app.get('/contact-us', checkNotAuthenticated,(req, res) => {
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
        console.log(data.rows);
        res.status(200).json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
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