
const { createReadStream, readFileSync} = require('fs');

const file = fs.readFileSync('file.txt');
const fileStream = fs.createReadStream('file.txt');

  
