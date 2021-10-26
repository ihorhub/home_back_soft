const { createReadStream, createWriteStream } = require('fs');

const source = createReadStream('file.txt', { encoding:"utf8" }); //set encoding or buffer mode by default
const destination = createWriteStream('fileCopy.txt');

source.push('3355'); //send to readable buffer

destination.write('hello!\n'); //write into writable stream

source.pipe(destination); //pipe two streams

source.on("data", function(chunk) {  //using events to access data chunks
  console.log(chunk);
});
