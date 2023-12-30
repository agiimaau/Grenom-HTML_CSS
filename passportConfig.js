const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
  console.log("Initialized");

  const authenticateUser = (phoneNumber, password, done) => {
    console.log(phoneNumber, password);
    pool.query(
      `SELECT * FROM public.Users WHERE PhoneNumber = $1`,
      [phoneNumber],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];
          console.log(user.passwordhash);
          const storedHashedPassword = user.passwordhash.trim()
          bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
            if (err) {
              console.error(err);
              return done(err);
              console.log("end aldaa");
            }
          
            if (isMatch) {
              console.log("Нууц үг зөв байна.");
              return done(null, user);
            } else {
              console.log("Нууц үг буруу байна");
              return done(null, false, { message: "Нууц үг буруу байна" });
            }
          });
          
        } else {
          // No user
          console.log("Та бүртгэлгүй байна.");
          return done(null, false, {
            message: "Ийм бүртгэлтэй хэрэглэгч байхгүй байна."
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "phoneNumber", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.userid));

  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM public.Users WHERE UserID = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log(`ID is ${results.rows[0].userid}`);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;