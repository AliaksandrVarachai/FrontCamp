var http = require("http");
var server = http.createServer(function(request, response) {
	response.write("This is a response");
	response.end();
});

server.listen(80);
console.log("Server is listening port 80...");