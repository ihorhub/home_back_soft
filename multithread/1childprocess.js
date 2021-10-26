//Коли користувач запускає одну програму Node.js, вона працює як один процес операційної системи (ОС), 
//який представляє екземпляр запущеної програми. В рамках цього процесу Node.js виконує програму у одному треді. 
//Оскільки тільки один тред може виконуватися в одному процесі, то операції, виконання яких займає багато часу в JavaScript, 
//можуть блокувати тред Node.js і затримувати виконання іншого коду. 
//Ключова стратегія роботи над цією проблемою полягає в запуску дочірнього процесу або процесу, створеного іншим процесом, 
//коли зустрічаються завдання з тривалим виконанням. При запуску нового процесу операційна система може використовувати багатопроцесорні техніки 
//для забезпечення паралельного або одночасного виконання основного процесу Node.js і додаткового дочірнього процесу.

//Node.js включає модуль child_process, який має функції для створення нових процесів. Крім роботи з дочірніми процесами, 
//цей модуль може також взаємодіяти з ОС і запускати команди оболонки. Користувачі можуть використовувати Node.js для запуску команд оболонки 
//для створення скриптів на Node.js замість скриптів оболонки(bash).
//================================================================================================================================
//1.exec() 
//Розробники зазвичай створюють дочірні процеси для виконання команд в операційній системі, коли необхідно проводити маніпуляції з виводом їх програм на Node.js 
//за допомогою оболонки, наприклад при використанні передачі або перенаправлення виводу оболонки. Функція exec () в Node.js створює новий процес оболонки і 
//виконує команду в цій оболонці. Вивід команди зберігається в буфері в пам'яті, який ви можете приймати за допомогою функції зворотного виклику, переданої в exec ().

// const { exec } = require('child_process');

// exec('ls -lh', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`error: ${error.message}`);
//     return;
//   }

//   if (stderr) {
//     console.error(`stderr: ${stderr}`);
//     return;
//   }

//   console.log(`stdout:\n${stdout}`);
// });

// const { execFile } = require('child_process');

// execFile('ifconfig', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`error: ${error.message}`);
//     return;
//   }

//   if (stderr) {
//     console.error(`stderr: ${stderr}`);
//     return;
//   }

//   console.log(`stdout:\n${stdout}`);
// });


//=================================================================================================================================
//2.spawn ()
//Функція spawn () запускає команду в процесі. Ця функція повертає дані через стандартні потоки I/O. Тому для отримання виводу дочірнього процесу нам потрібно буже прослухати події потоку.
//За допомогою функцій exec () і execFile () ми задавали аргументи разом з командою в одному рядку. Однак за допомогою spawn () всі аргументи для команд повинні бути введені 
//в масив. Це тому, що spawn (), на відміну від exec () і execFile (), не створює нову оболонку перед запуском процесу. 
//Щоб команди знаходилися в одному рядку зі своїми аргументами, необхідно, щоб Node.js також створив нову оболонку(shell).

// const { spawn } = require('child_process');

// const child = spawn('find', ['.']);

// child.stdout.on('data', (data) => {
//   console.log(`stdout:\n${data}`);
// });

// child.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// child.on('error', (error) => {
//   console.error(`error: ${error.message}`);
// });

// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

//=================================================================================================================================
//3.fork ()
//Варіант spawn (), для створення дочірнього процесу, який також є процесом Node.js. Головною перевагою використання fork () для створення процесу Node.js над spawn () 
//та exec () є те, що fork () забезпечує комунікацію між батьківським і дочірнім процесом.
//За допомогою fork (), крім отримання даних з дочірнього процесу, батьківський процес може відправляти повідомлення в виконуваний дочірній процес. 
//Аналогічним чином дочірній процес може відправляти повідомлення в батьківський процес.

const http = require('http');
const { fork } = require('child_process');

const host = 'localhost';
const port = 8000;

const slowFunction = () => {
  let counter = 0;
  while (counter < 5000000000) {
    counter++;
  }
 
  return counter;
}

const requestListener = function (req, res) {
  if (req.url === '/total') {
    //1-----------------------------------
    // let slowResult = slowFunction();
    // let message = `{"totalCount":${slowResult}}`;
    
    // console.log('Returning /total results');
    // res.setHeader('Content-Type', 'application/json');
    // res.writeHead(200);
    // res.end(message);
   // 2----------------------------------------------
    const child = fork(__dirname + '/getCount');
    child.on('message', (message) => {
      console.log('Returning /total results');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(message);
    });
    child.send('START');
   // ----------------------------------------------
  } else if (req.url === '/hello') {
    console.log('Returning /hello results');
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(`{"message":"hello"}`);
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

//curl http://localhost:8000/total
//curl http://localhost:8000/hello