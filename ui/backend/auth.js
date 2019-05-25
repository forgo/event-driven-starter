const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const HttpStatus = require('http-status-codes')
const User = require('./User')

// super "secret" that would normally be stored encrypted
// and provided at runtime for a real application ;)
const secret = 'Gri0C0unt3rK33pi7$3cr37K33pi7$@f3'

/*
 * response helpers
 */
const responseError = (response, error) => {
  response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error })
}

const responseBadCredentials = (response, error) => {
  response.status(HttpStatus.UNAUTHORIZED).json({ error: error })
}

const responseAuthenticated = (response, username) => {
  // Issue token
  const payload = { username }
  const options = { expiresIn: '30m' }
  const token = jwt.sign(payload, secret, options)

  // tells browsers not to allow client-side script access to cookie
  // and mitigates common XSS attacks
  const cookieOptions = { httpOnly: true }

  response.cookie('token', token, cookieOptions).sendStatus(HttpStatus.OK)
}

const responseBadToken = (response, error) => {
  response.status(HttpStatus.UNAUTHORIZED).json({ error: error })
}

const responseWhoAmI = (response, user) => {
  // explicity extract the properties of the user needed by the client
  // prevents things about the user from coming back
  // (e.g - the password hash)
  const userSafe = { username: user.username }
  response.status(HttpStatus.OK).json({ user: userSafe })
}

/*
 * token verificatio middleware
 *   apply this to secure endpoints
 */
const withAuth = function(req, res, next) {
  // try to find token, somewhere, anywhere...
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token
  if (!token) {
    // a secure endpoint expects a token, we can't do much if it's not there
    responseBadToken(res, 'No token provided')
  } else {
    // verify the token using our private key/secret
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        // something went wrong verifying the JWT
        responseBadToken(res, 'Invalid token')
      } else {
        // the token could be verified, so we'll pass along the username
        // to downstream middleware
        req.username = decoded.username
        next()
      }
    })
  }
}

/*
 * login middleware
 */
const login = function(req, res) {
  // extract username and password from login POST body
  const { username, password } = req.body

  // lookup username from our in-memory user DB
  User.findOne({ username }, (err, user) => {
    if (err) {
      // something went wrong in lookup
      responseError(res, 'Internal server error')
    } else if (!user) {
      // username doesn't match any known user
      responseBadCredentials(res, 'Bad credentials')
    } else {
      // username matched a known user, now check their password
      User.checkPassword(user, password, (err, same) => {
        if (err) {
          // something went wrong checking the password
          responseError(res, 'Internal server error')
        } else if (!same) {
          // the password was incorrect
          responseBadCredentials(res, 'Bad credentials')
        } else {
          // everything checks out here
          responseAuthenticated(res, username)
        }
      })
    }
  })
}

/*
 * logout middleware
 */
const logout = function(req, res) {
  // cookies available from `cookieParser` middleware in server.js
  const cookies = req.cookies
  for (let prop in cookies) {
    if (!cookies.hasOwnProperty(prop)) {
      continue
    }
    // immediately expire our cookies to effectively logout
    res.cookie(prop, '', { expires: new Date(0) })
  }
  // redirect for changes to take effect
  res.redirect('/')
}

/*
 * whoAmI middleware
 *   used to re-sync user state info with client on refresh
 */
const whoAmI = function(req, res) {
  // req.username is exctracted from withAuth middleware
  // when a valid token is found
  User.findOne({ username: req.username }, (err, user) => {
    if (err) {
      // something went wrong trying to lookup the user
      responseError(res, 'Internal error please try again')
    } else if (!user) {
      // there is no user matching the username in the JWT payload
      // maybe the user was deleted from the db during the token lifetime
      responseBadToken(res, 'Incorrect token')
    } else {
      // the token is valid and we found the user in our db!
      responseWhoAmI(res, user)
    }
  })
}

/*
 * exports
 */
module.exports = {
  withAuth,
  login,
  logout,
  whoAmI,
}
