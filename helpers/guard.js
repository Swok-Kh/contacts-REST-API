const passport = require('passport')
require('../config/passport')

const { httpCodes } = require('./constants')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token
    const bearerToken = req.get('Authorization')
    if (bearerToken) token = bearerToken.split(' ')[1]

    if (!user || err || user.token !== token) {
      return res.status(httpCodes.UNAUTHORIZED).json({
        status: 'error',
        code: httpCodes.UNAUTHORIZED,
        message: 'Not authorized'
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}
module.exports = guard
