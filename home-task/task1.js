const fs = require('fs')
const LimitSizeStream = require('../../course/1/LimitSizeStream')
const limitedStream = new LimitSizeStream({ limit: 8 })
const outStream = fs.createWriteStream('out.txt')

class CounterTransform extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const resultString = `*${chunk.toString('utf8')}*`

      callback(null, resultString)
    } catch (err) {
      callback(err)
    }
  }
}
limitedStream.pipe(outStream)

limitedStream.write('hello')

setTimeout(() => {
  limitedStream.write('world')
}, 10)

const stream = require('stream')
const LimitExceededError = require('./LimitExceededError')

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options)
    this.limit = options.limit
    this.counter = 0
  }

  _transform(chunk, encoding, callback) {
    this.counter += chunk.length
    if (this.counter >= this.limit) {
      throw new LimitExceededError()
    }
    this.push(chunk)
    callback(null, null)
  }
}

module.exports = LimitSizeStream
