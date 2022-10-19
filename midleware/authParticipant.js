const passport = require('passport')

exports.authParticipant = passport.authenticate('jwt', { session: false })