const {parentPort, workerData} = require("worker_threads");

parentPort.on("message", data => {
  data.nums.forEach(num => {
    parentPort.postMessage({num: num, fib: getFib(num)});
  });
})

function getFib(num) {
  if (num === 0) {
    return 0;
  } else if (num === 1) {
    return 1;
  } else {
    return getFib(num - 1) + getFib(num - 2);
  }
}