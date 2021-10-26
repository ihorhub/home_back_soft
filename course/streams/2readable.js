const { Readable } = require('stream');

class myReadable extends Readable {
 
  constructor(opt) {
    super(opt);
    this._max = 10;
    this._index = 0;
  }

  _read() {
    this._index += 1;

    if (this._index > this._max) {
      this.push(null);
    } else {
      const buf = Buffer.from(`${this._index}`);
      //const buf = `${this._index}`;
      console.log(`Added: ${this._index}. Could next be added? `, this.push(buf));
      console.log('buffer ', this._readableState.buffer.head);
    }
  }
}

const counter = new myReadable({ highWaterMark: 2}); //, encoding: "utf8"

//console.log(`Received: ${counter.read()}`);

counter.on('data', chunk => {
  console.log(`Received: ${chunk.toString()}`);
});



