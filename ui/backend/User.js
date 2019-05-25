const bcrypt = require('bcrypt')
const UsersDB = require('./UsersDB')

const saltRounds = 10

module.exports = class User {
  static findOne(query, callback) {
    try {
      const user = UsersDB.findOne(query)
      callback(undefined, user)
    } catch (error) {
      callback(undefined, undefined)
    }
  }

  static checkPassword(user, password, callback) {
    bcrypt.compare(password, user.hash, (err, same) => {
      return err ? callback(err) : callback(undefined, same)
    })
  }

  static passwordHash(password, callback) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        callback(err)
      } else {
        callback(undefined, hash)
      }
    })
  }
}
