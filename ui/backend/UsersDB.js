const loki = require('lokijs')
const User = require('./user')

// create in-memory db w/file persistence
const db = new loki('loki.json')

// create user collection
const UsersDB = db.addCollection('users')

// create mock user credentials for demo
const seed_users = [
  {
    username: 'test_user',
    password: 'test_password',
  },
]

// populate user db with users and password hashes, if possible
seed_users.forEach(user => {
  User.passwordHash(user.password, (err, hash) => {
    if (!err) {
      UsersDB.insert({
        username: user.username,
        hash: hash,
      })
    }
  })
})

module.exports = UsersDB
