const http = require("http");
 
const srv = http.createServer((request, response) => {
  console.log(request.method, request.url, request.headers, '\n');
  response.setHeader("Content-Type", "text/html; charset=utf-8;");
  response.setHeader("UserId", 12);
  response.statusCode = 201;
  response.write("<h1>hhhhhhhhhhhhhhh</h1>")
  
  response.write("<h2>hello nodejs!</h2>");
  response.end();
    
});
srv.listen(3000);