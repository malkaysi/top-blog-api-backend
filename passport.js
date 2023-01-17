var passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var bcrypt = require('bcryptjs');
require('dotenv').config();

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      // Compare inputted password vs saved hash
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(err);
        }
        
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
    });
  })
)

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
  function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    User.findById({ _id: jwtPayload.user.id })
      .exec(function (err, user){
        if (err) {
          return cb(err)
        }
        return cb(null, user)
      });
  }
));