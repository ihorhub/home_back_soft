const {Worker} = require("worker_threads");

let nums = [21, 33, 15, 40];

//get size of the array buffer with int32 size buffer for each element in the array
const size = Int32Array.BYTES_PER_ELEMENT*nums.length;

//The SharedArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer, similar to the ArrayBuffer object, 
//but in a way that they can be used to create views on shared memory.
//create the buffer for the shared array
console.log(`buffer size: ${size}`)
const sharedBuffer = new SharedArrayBuffer(size);
//You cannot directly manipulate the contents of an ArrayBuffer(SharedArrayBuffer); instead, you create one of the typed array objects
// which represents the buffer in a specific format, and use that to read and write the contents of the buffer.

const sharedArray = new Int32Array(sharedBuffer);
console.log('sharedArray before data: ', sharedArray);

//filling sharedArray with data
//Коли пам'ять розділена, кілька потоків можуть читати і записувати одні й ті ж дані в пам'ять. Атомарні операції гарантують, 
//що очікувані значення будуть записані і прочитані, а операції завершені, перш ніж наступна операція почне свою роботу, і вони не будуть перервані.
nums.forEach((num, index) => {
  Atomics.store(sharedArray, index, num);
})

console.log('sharedArray: ', sharedArray);
console.log('sharedArray buffer: ', sharedArray.buffer);
//Create new worker
const worker = new Worker("./memworker.js");

//Listen for a message from worker
worker.on("message", result => {
  console.log(`${result.num}th Fibonacci Number: ${result.fib}`);
});

worker.on("error", error => {
  console.log(error);
});

worker.postMessage({nums: sharedArray});