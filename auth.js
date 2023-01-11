var passport = require('passport');

const auth = {
  required: passport.authenticate('jwt', {session: false}),
}

module.exports = auth;