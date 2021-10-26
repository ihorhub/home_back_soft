const http = require('http')
const url =
  'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=50.45,30.52&units=m'
// const url = 'https://inventorsoft.co/'
const urlNext = 'http://localhost:3000'

const request = http.request(url, (response) => {
  let data = ''

  response.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  response.on('end', () => {
    try {
      const body = JSON.parse(data) //if application/json
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
