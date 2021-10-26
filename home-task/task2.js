const fs = require('fs')
const http = require('http')
const zlib = require('zlib')

const url = 'https://jsonplaceholder.typicode.com/'

const request = http.request(url, (response) => {
  let data = ''
  const gs = zlib.createGzip()
  const filepath = __dirname + 'fileTask@.txt'
  const writeStream = fs.createWriteStream(filepath)

  response.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  response.pipe(gs).pipe(writeStream)

  response.on('end', () => {
    try {
      const body = JSON.parse(data)
      console.log(body)
    } catch (error) {
      console.log('Not JSON!')
      console.log(data)
    }
  })
})

request.on('error', (error) => {
  console.log('An error', error)
})

request.end()
