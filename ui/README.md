# event-driven-starter

## Quick Start
````
# install dependencies
npm i

# run frontend and backend simultaneously
npm run dev
````

- In your browser, go to `http://localhost:8080`.
  - Without an existing token, you should be redirected to the `/login` page.
- Enter these credentials:
  - _username_: `test_user`
  - _password_: `test_password`
  
---

If you want to run the backend and frontend separately, use the following scripts.

## Frontend
```
# http://localhost:8080
# React.js, Redux, Redux-Saga, webpack, etc.
npm run frontend
```

## Backend
```
# http://localhost:3000
# Express.js, LokiJS, jsonwebtoken, bcrypt, big-integer, etc.
npm run backend
```
## API Endpoints
http://localhost:3000

### POST /api/login

This endpoint is used by the login form to submit a username and password. For demo purposes, these credentials are tested against an in-memory LokiJS database, and seeded with some dummy usernames and hashed passwords upon the Express.js Node service starting up.

If the provided credentials are valid, then a successful HTTP 200 OK status is returned, and a cookie named `token` generated. The `token` cookie is a JSON Web Token (JWT), set to expire in 30 minutes, and contains the authenticated username.

The JWT is signed with a secret key that is insecurely hard-coded for demo purposes. In reality, this secret should be in an encrypted store and supplied via an environment variable at runtime.

Any endpoints which employ the `withAuth` middleware (`/api/whoAmI` and `/api/increment`) will be secured based on the user having a valid, non-expired version of this `token` cookie in their request.

#### Example: valid credentials
```
# request body
{
  'username': 'test_user',
  'password': 'test_password'
}

# response
200 OK

Cookie: name = 'token', value = <signed JWT>
  JWT payload: { 'username': 'test_user', exp: <30 minute expiration date>, ... }
```

#### Example: invalid credentials
```
# request body
{
  'username': 'test_user',
  'password': 'wrong_password'
}

# response status
401 UNAUTHORIZEED
```

### POST /api/logout
This endpoint allows removes the `token` cookie that is generated upon a successful login. This is important from the UI perspective as it will force the authentication middleware to send a HTTP 401 status on subsequent calls to secure endpoints. 

The HTTP 401 status could either be because the token was not supplied, expired, or invalid for any other reason. In any case, the UI can now use this response to act accordingly by setting it's authentication state and redirecting to a login page.

#### Example: valid logout
```
# request body
<empty>

# response status
304 REDIRECT

Cookie: name = 'token', value = <does not exist>
```

### GET /api/whoAmI
This endpoint is used as an initial-condition and on-browser-refresh validation of an existing `token` cookie the user may have. Without this, the browser app could easily get confused about the state of authentication stored in Redux, as the Redux state is inherently re-initialized on refresh. 

If there's still a valid `token` cookie, then hitting this endpoint will confirm that by responding with an HTTP 200 status and a `user` payload. The payload is cleaned on the server side to prevent sensitive user information from being passed.

#### Example: valid whoAmI
```
# request cookie
Cookie: name = 'token', value = <signed, valid JWT>

# response status
200 OK

# response.data.user
{
  'username': 'test_user'
}
```

### GET /api/increment
This endpoint takes a single query param `count`, represented as an integer string, and responds with a next count based on a basic formula. This endpoint implements the `withAuth` middleware to ensure whoever uses it must have a valid token.

In summary, the calculation is effectively:

`nextCount = count === 0 ? 1 : count * 2`

However, this isn't the actual logic. We are using the `big-integer` library to be able to handle numbers beyond the ordinary JavaScript overflow limits, and this also means keeping the numbers in a string format. Here is how it actually works:

```
const bigInt = require('big-integer')

const bigIncrement = countString => {
  const base = 10
  const alphabet = ['0123456789']

  bigInt(count)
  let newCountString = undefined
  if (bigInt(count).isZero()) {
    newCountString = bigInt.one.toString()
  } else {
    newCountString = bigInt(count)
      .multiply(2)
      .toString()
  }
  return newCountString
}
```

#### Example: valid increment
```
# request
GET http://localhost:3000/api/increment&count=0

# response
200 OK

# response.data.count
1
```

#### Example: invalid increment
```
# request
GET http://localhost:3000/api/increment&count=asdf


# response status
400 BAD REQUEST

# error.response.data.error
'count must be parseable as big-integer string'
```
