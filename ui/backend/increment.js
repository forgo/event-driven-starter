const bigInt = require('big-integer')
const HttpStatus = require('http-status-codes')

const increment = function(req, res) {
  const { count } = req.query

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

  try {
    const newCount = bigIncrement(count)
    res.status(HttpStatus.OK).json({ count: newCount })
  } catch (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: 'count must be parseable as big-integer string' })
  }
}
module.exports = increment
