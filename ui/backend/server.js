const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const { withAuth, login, logout, whoAmI } = require('./auth')
const increment = require('./increment')

const port = 3000

const app = express()

// NOTE: I'm not handling HTTPS or CORS because this demo is not
// intended to deployed outside of a `localhost` context, and the
// overhead to implementing these features outweighed the benefit
// of including them, when I could demonstrate skills in other areas

// helmet helps secure the api by setting various HTTP headers
// by default, the following middleware are applied:
// - dnsPrefetchControl: controls browser DNS prefetching
// - frameguard: to prevent clickjacking
// - hidePoweredBy: to remove the X-Powered-By header
// - hsts: for HTTP Strict Transport Security
// - ieNoOpen: sets X-Download-Options for IE8+
// - noSniff: to keep clients from sniffing the MIME type
// - xssFilter: adds some small XSS protections
// not default (to be added here):
// - noCache: to disable client-side cacheing
app.use(helmet({ noCache: true }))

// enable parsing JSON payloads
app.use(express.json())

// parses `Cookie` header and populates `req.cookies` with an
// object keyed by the cookie names
app.use(cookieParser())

app.listen(port, () =>
  console.log(`UI backend server listening on port ${port}!`)
)

// auth handling
app.post('/api/login', login)
app.post('/api/logout', logout)
app.get('/api/whoAmI', withAuth, whoAmI)

// increment api
app.get('/api/increment', withAuth, increment)
