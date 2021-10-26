const { Writable } = require('stream');

class Counter extends Writable {
  constructor(opt) {
    super(opt);
  }

  _write(chunk, encoding, callback) {
    console.log(chunk);

    callback(null);
  }
}

const counter = new Counter({ highWaterMark: 2} ); //, encoding: "utf8"
//counter.setDefaultEncoding("utf8")
  for (let i = 1; i <= 11; i += 1) {
    const canWrite = counter.write(Buffer.from(i.toString()));
    //const canWrite = counter.write(`${i}`);
    console.log(`Buffer max reached? ${i}  ${canWrite}`);
    console.log('=============================================')
    
  }
