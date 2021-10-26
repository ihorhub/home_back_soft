const {Worker} = require("worker_threads");

let num = 40;

//1Listen for a message from worker
// const worker = new Worker("./myWkr.js", {workerData: {num: num}});
// worker.once("message", result => {
//   console.log(`${num}th Fibonacci Number: ${result}`);
// });

//2.subscribing to all messages from worker
const worker = new Worker("./myWkr.js");
worker.on("message", result => {
  console.log(`${result.num}th Fibonacci Number: ${result.fib}`);
});

worker.on("error", error => {
  console.log(error);
});

worker.on("exit", exitCode => {
  console.log("Finished with code", exitCode);
})
console.log("Executed in the parent thread");

//2
worker.postMessage({num: 40});
worker.postMessage({num: 12});