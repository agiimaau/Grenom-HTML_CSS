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
app.use(express.json());
const upload = multer();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Grenom",
            version: "1.0.0",
            description:
                "Ном солилцооны вэбсайт", 
            contact: {
                name: "Admin",
                url: "localhost:4000",
                email: "grenom@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:4000/"
            }
        ]
    },
    apis: ["./server.js"]
  };
  
  const specs = swaggerDocument(options);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT=process.env.PORT || 4000;

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


/**
 * @swagger
 * /:
 *   get:
 *     summary: Nuur huudas
 *     description: Nuur huudas ruu shiljih api.
 *     responses:
 *       200:
 *         description:Amjilltai! Nuur huudas ruu shiljine.
 *         content:
 *           text/html:
 *             example: "<html>Nuur huudasnii contentuud</html>"
 */
app.get('/', checkNotAuthenticated, (req, res) => {
    res.sendFile('/view/index.html', { root: __dirname })
});

/**
 * @swagger
 * /sign-up:
 *   get:
 *     summary: Burtguuleh huudas
 *     description: Burtguuleh huudas ruu shiljih api.
 *     responses:
 *       200:
 *         description:Amjilttai! Burtguuleh huudas ruu shiljine.
 *         content:
 *           text/html:
 *             example: "<html>Burtguuleh huudasnii contentuud</html>"
 */
app.get('/sign-up', checkAuthenticated, (req, res) => {
    res.sendFile('/view/sign-up.html', { root: __dirname })
});

/**
* @swagger
* /log-in:
*   get:
*     summary: Nevtreh huudas
*     description: Nevtreh huudas ruu shiljih api.
*     responses:
*       200:
*         description: Amjilttai! Nevtreh huudas ruu shiljine.
*         content:
*           text/html:
*             example: "<html>Nevtreh huudasnii contentuud</html>"
*/
app.get('/log-in', checkAuthenticated, (req, res) => {
   res.sendFile('/view/log-in.html', { root: __dirname })
});

/**
* @swagger
* /book-exchange:
*   get:
*     summary: Nom soliltsoonii huudas
*     description: Nom soliltsoonii huudas ruu shiljih api
*     responses:
*       200:
*         description: Amjilttai! Nom soliltsoonii huudas ruu shiljine
*         content:
*           text/html:
*             example: "<html>Npm soliltsoonii huudasnii contentuud</html>"
*/
app.get('/book-exchange', checkNotAuthenticated, (req, res) => {
   res.sendFile('/view/book-exchange.html', { root: __dirname })
});

/**
* @swagger
* /book-sale:
*   get:
*     summary: Nom hudaldaanii huudas
*     description: Nom hudaldaanii huudas ruu shiljih api
*     responses:
*       200:
*         description: Amjilttai! Nom hudaldaanii huudas ruu shiljine
*         content:
*           text/html:
*             example: "<html>Nom hudaldaanii huudasnii contentuud</html>"
*/
app.get('/book-sale', checkNotAuthenticated, (req, res) => {
   res.sendFile('/view/book-sale.html', { root: __dirname })
});

/**
* @swagger
* /cart:
*   get:
*     summary: Sagsnii huudas
*     description: Sagsnii huudas ruu shiljih api.
*     responses:
*       200:
*         description: Amjilttai! Sagsnii huudas ruu shiljine.
*         content:
*           text/html:
*             example: "<html>Sagslah huudasnii contentuud</html>"
*/
app.get('/cart', (req, res) => {
   res.sendFile('/view/cart.html', { root: __dirname })
});

/**
* @swagger
* /minii-bulan:
*   get:
*     summary: Minii Bulan huudas
*     description: Minii bulan huudas shiljih api.
*     responses:
*       200:
*         description: Amjilttai! Minii bulan huudas ruu shiljine.
*         content:
*           text/html:
*             example: "<html>Minii Bulan huudasnii contentuud</html>"
*/
app.get('/minii-bulan',  (req, res) => {
   res.sendFile('/view/MiniiBulan.html', { root: __dirname })
});

/**
* @swagger
* /contact-us:
*   get:
*     summary: Holboo barih huudas
*     description: Holboo barih huudas ruu shiljih api
*     responses:
*       200:
*         description: Amjilttai! Holboo barih huudas ruu shiljine
*         content:
*           text/html:
*             example: "<html>Holboo barih huudasnii contentuud</html>"
*/
app.get('/contact-us', checkNotAuthenticated, (req, res) => {
   res.sendFile('/view/Contact-us.html', { root: __dirname })
});


/**
* @swagger
* /contact-us:
*   get:
*     summary: Nevtreh huudas ruu shiljine
*     description: Nevtreh huudas ruu shiljine gexdee amjilltai log out hiisen measseage tai
*     responses:
*       200:
*         description: Amjilttai! log out hiigdej nevtreh huudas ruu shiljine
*         content:
*           text/html:
*             example: "<html>Nevtreh huudasnii contentuud</html>"
*/
app.get('/log-out', (req, res) => {
    req.logOut(function (err) {
        if (err) { return next(err); }
        req.flash("success_msg", "You have successfully logged out.");
        res.redirect("/log-in");
    });
});
/**
 * @swagger
 * /bookdata:
 *   get:
 *     summary: Soliltsoh nomnii medeelel haruulah.
 *     description: Ogogdliin sangaas nomnii medeelluudiig tataj, json helbert oruulna.
 *     tags:
 *       - Book Exchange
 *     responses:
 *       '200':
 *         description: JSON helbert orson ogogdliin sangiin datag haruulna.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookid:
 *                     type: integer
 *                   userid:
 *                     type: integer
 *                   bookimage:
 *                     type: string
 *                   starrate:
 *                     type: integer
 *                   bookname:
 *                     type: string
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                   author:
 *                     type: string
 *                   wear:
 *                     type: integer
 *                   pages:
 *                     type: integer
 *                   publisheddate:
 *                     type: string
 *                   descrip:
 *                     type: string
 *                   publisherpicture:
 *                     type: string
 *                   publisherlastname:
 *                     type: string
 *                   publisherfirstname:
 *                     type: string
 *               example:
 *                 - bookid: 17
 *                   userid: 1
 *                   bookimage: "pictures/4bish4.jpg"
 *                   starrate: 4
 *                   bookname: "4 биш 4"
 *                   category: ["Улс төр", "Уран Зохиол"]
 *                   author: "Анударь"
 *                   wear: 8
 *                   pages: 120
 *                   publisheddate: "2023"
 *                   descrip: "3,4 р хороолол хавьцаа солилцвол сайн байна. Бараг шинээрээ байгаа."
 *                   publisherpicture: "pictures/Agiimaa.jpg"
 *                   publisherlastname: "Keanu"
 *                   publisherfirstname: "Reeves"
 *       '500':
 *         description: Internal Server Error.
 */
app.get("/bookdata", async (req, res) => {
    try {
        const query = `
            SELECT eb.*, 
                   u.UserPicture AS publisherpicture,
                   u.LastName AS publisherlastname,
                   u.FirstName AS publisherfirstname,
                   ce.Status AS status,
                   ce.ReqDate AS reqdate
            FROM public.ExchangeBooks AS eb
            JOIN public.Users AS u ON eb.UserID = u.UserID
            LEFT JOIN public.CartEx AS ce ON eb.BookID = ce.BookID;
        `;
        const data = await pool.query(query);
        res.status(200).json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Hereglegch burtgeh
 *     description: Hereglegchiin oruulsan medeelliin daguu hereglegch burtgene.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               lastName:
 *                 type: string
 *                 description: Last name of the user.
 *               firstName:
 *                 type: string
 *                 description: First name of the user.
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Amjilltai burtgene.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *       400:
 *         description: Request esvel batalgaajulaltiin aldaa.
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - message: "Бүх талбарыг бөглөнө үү."
 *                 - message: "Нууц үг дор хаяж 6 тэмдэгт байх ёстой."
 *       409:
 *         description: zorchil, utasnii dugaar burtgeltei baina
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - message: "Энэ дугаар аль хэдийн бүртгэгдсэн байна."
 *       500:
 *         description: Internal Server Error.
 */

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

/**
 * @swagger
 * /log-in:
 *   post:
 *     summary: Nevtreh
 *     description: Ugugdsun oroltod undeslen hereglegchiig batalgaajuulna.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Hereglegchiin utasnii dugaar.
 *               password:
 *                 type: string
 *                 description: Hereglegchiin password.
 *     responses:
 *       302:
 *         description: Nuur huudas ruu shiljine.
 *       401:
 *         description: Amjiltgui nevtrelt, nevtreh huudas ruu dahin butsaana.
 *       500:
 *         description: Internal Server Error.
 */
app.post(
    '/log-in',
    passport.authenticate("local", {
      successRedirect: '/',
      failureRedirect: '/log-in',
      failureFlash: true
    })
  );
  

    
//deer bgaa buh apid doc hiisen






/**
 * @swagger
 * /bookdata-sale:
 *   get:
 *     summary: Zarah nomnii medeelel haruulah.
 *     description: Ogogdliin sangaas nomnii medeelluudiig tataj, json helbert oruulna.
 *     tags:
 *       - Sale Books
 *     responses:
 *       '200':
 *         description: JSON helbert orson ogogdliin sangiin datag haruulna.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookid:
 *                     type: integer
 *                   userid:
 *                     type: integer
 *                   oldprice:
 *                     type: integer
 *                   newprice:
 *                     type: integer
 *                   bookimage:
 *                     type: string
 *                   star_rate:  # Corrected property name
 *                     type: integer
 *                   bookname:
 *                     type: string
 *                   category:
 *                     type: array
 *                   author:
 *                     type: string
 *                   wear:
 *                     type: integer
 *                   pages:
 *                     type: integer
 *                   publisheddate:
 *                     type: string
 *                   description:
 *                     type: string
 *               example:
 *                 - bookid: 17
 *                   userid: 1
 *                   oldprice: 3500
 *                   newprice: 15000
 *                   bookimage: "pictures/ad uzegdeh zorig.jpg"
 *                   star_rate: 4  # Corrected property name
 *                   bookname: "4 биш 4"
 *                   category: ["Улс төр", "Уран Зохиол"]
 *                   author: "Анударь"
 *                   wear: 8
 *                   pages: 120
 *                   publisheddate: "2023"
 *                   description: "3,4 р хороолол хавьцаа солилцвол сайн байна."
 *       '500':
 *         description: Internal Server Error.
 */




    app.get("/bookdata-sale", async (req, res) => {
        try {
            const query = `
            SELECT eb.*, 
            u.UserPicture AS publisherpicture,
            u.LastName AS publisherlastname,
            u.FirstName AS publisherfirstname,
            ce.Status AS status,
            ce.ReqDate AS reqdate
     FROM public.SaleBooks AS eb
     JOIN public.Users AS u ON eb.UserID = u.UserID
     LEFT JOIN public.CartSale AS ce ON eb.BookID = ce.BookID;
 `;
            
            const data = await pool.query(query);
            
            res.status(200).json(data.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.post('/addToCart', upload.none(), async (req, res) => {
        const { sellerID, bookID } = req.body;
        var buyerID = req.user.userid;
        console.log(buyerID, sellerID, bookID);
    
        if (buyerID != sellerID) {
            try {
                // First, check if the book is already in the cart
                const checkQuery = `SELECT * FROM CartEx WHERE BuyerID = $1 AND SellerID = $2 AND BookID = $3`;
                const checkResult = await pool.query(checkQuery, [buyerID, sellerID, bookID]);
    
                if (checkResult.rows.length > 0) {
                    // If the book is already in the cart, send a message
                    res.status(400).send('This book is already in your cart');
                } else {
                    // If the book is not in the cart, insert it
                    const insertQuery = `INSERT INTO CartEx (BuyerID, SellerID, BookID, Status, ReqDate) VALUES ($1, $2, $3, 'W', NOW()) RETURNING *;`;
                    const result = await pool.query(insertQuery, [buyerID, sellerID, bookID]);
                    res.json(result.rows[0]);
                    console.log("Successfully added to database");
                }
            } catch (err) {
                console.error(err);
                res.status(500).send('Server error');
            }
        } else {
            // If buyerID and sellerID are the same, send an appropriate response
            res.status(400).send('Buyer and seller cannot be the same');
        }
    });
    

    app.post('/addToCartSB', upload.none(), async (req, res) => {
        const { sellerID, bookID } = req.body;
        var buyerID = req.user.userid;
        console.log(buyerID, sellerID, bookID);
    
        if (buyerID != sellerID) {
            try {
                // First, check if the book is already in the cart
                const checkQuery = `SELECT * FROM CartSale WHERE BuyerID = $1 AND SellerID = $2 AND BookID = $3`;
                const checkResult = await pool.query(checkQuery, [buyerID, sellerID, bookID]);
    
                if (checkResult.rows.length > 0) {
                    // If the book is already in the cart, send a message
                    res.status(400).send('This book is already in your cart');
                } else {
                    // If the book is not in the cart, insert it
                    const insertQuery = `INSERT INTO CartSale (BuyerID, SellerID, BookID, Status, ReqDate) VALUES ($1, $2, $3, 'W', NOW()) RETURNING *;`;
                    const result = await pool.query(insertQuery, [buyerID, sellerID, bookID]);
                    res.json(result.rows[0]);
                    console.log("Successfully added to database");
                }
            } catch (err) {
                console.error(err);
                res.status(500).send('Server error');
            }
        } else {
            // If buyerID and sellerID are the same, send an appropriate response
            res.status(400).send('Buyer and seller cannot be the same');
            console.log("uurinhuu nomiig awkd bn nemegdeegu shuu");
        }
    });
    app.get('/basket', async (req, res) => {
        try {
            const buyerID = req.user.userid; 
            const query = 'SELECT * FROM CartEx WHERE BuyerID = $1';
            const result = await pool.query(query, [buyerID]);
            res.json(result.rows);
            console.log(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    });
    app.get('/basketSB', async (req, res) => {
        try {
            const buyerID = req.user.userid; 
            const query = 'SELECT * FROM CartSale WHERE BuyerID = $1';
            const result = await pool.query(query, [buyerID]);
            res.json(result.rows);
            console.log(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    });
    app.get('/miniiBulanFetch', async (req, res) => {
        try {
            const buyerID = req.user.userid; 
            const query = `
                SELECT eb.*, 
                u.UserPicture AS publisherpicture,
                u.LastName AS publisherlastname,
                u.FirstName AS publisherfirstname
                FROM public.SaleBooks AS eb
                JOIN public.Users AS u ON eb.UserID = u.UserID
                WHERE eb.UserID = $1
            `;
            const result = await pool.query(query, [buyerID]);
            res.json(result.rows);
            console.log(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    });
    
    app.post('/removeFromCart', async (req, res) => {
        const { product_id } = req.body;
        var buyerID = req.user.userid;
    
        try {
            const deleteQuery = `DELETE FROM CartEx WHERE BuyerID = $1 AND BookID = $2`;
            await pool.query(deleteQuery, [buyerID, product_id]);
            
            res.json({ message: 'Item removed from cart' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    });
    app.post('/removeFromCartSB', async (req, res) => {
        const { product_id } = req.body;
        var buyerID = req.user.userid;
    
        try {
            const deleteQuery = `DELETE FROM CartSale WHERE BuyerID = $1 AND BookID = $2`;
            await pool.query(deleteQuery, [buyerID, product_id]);
            
            res.json({ message: 'Item removed from cart' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
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

function checkAuthenticated(req, res, next) {
    console.log("reaches check authen");
      if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      next();
    }