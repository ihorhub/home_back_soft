const http = require("http");
const PORT = 3000;
  
http.createServer(function(request, response) {
    
  response.setHeader("Content-Type", "text/html; charset=utf-8;");
    
  if(request.url === "/home"){
    response.write("<h2>Home</h2>");
  }
  else if(request.url == "/http"){
    response.write("<h2>Http</h2>");
  }
  else if(request.url == "/streams"){
    response.write("<h2>Streams</h2>");
  }
  else if(request.url === "/"){
    response.statusCode = 301; 
    // на адресу localhost:3000/redir
    response.setHeader("Location", "/redir");
  }
  else if(request.url == "/redir"){
    response.write("<h1>Redirected from root</h1>");
  }
  else if(request.url == "/util"){
    response.write("<h2>Util</h2>");
  }
  else {
    response.write("<h2>Not found</h2>");
  }
  response.end();
}).listen(PORT, function(){
  console.log(`Server started at ${PORT}`);
});

//task 2)HTTP send file in response using streams
//fs.createReadStream(filePath).pipe(response);