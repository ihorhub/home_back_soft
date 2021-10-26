const { Writable, Readable, Transform } = require('stream');

class CounterReader extends Readable {
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
        const buf = Buffer.from(`${this._index}`, 'utf8');
  
        this.push(buf);
      }
    }
  }
  
  class CounterWriter extends Writable {
    constructor(opt) {
      super(opt);
    }

    _write(chunk, encoding, callback) {
      console.log(chunk.toString());
  
      callback();
    }
  }
  
  class CounterTransform extends Transform {
    _transform(chunk, encoding, callback) {
      try {
        const resultString = `*${chunk.toString('utf8')}*`;
  
        callback(null, resultString);
      } catch (err) {
        callback(err);
      }
    }
  }
  
  const counterReader = new CounterReader();
  const counterWriter = new CounterWriter();
  const counterTransform = new CounterTransform();
  
  counterReader.pipe(counterTransform).pipe(counterWriter);