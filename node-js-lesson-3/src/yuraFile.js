var app = express()
const fs = require('fs')
fs.writeFile('hello.txt', function (error, data) {
  console.log('aaaa')
  if (error) throw error
  console.log(data)
})
