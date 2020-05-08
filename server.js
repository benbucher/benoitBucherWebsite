var http = require('http');
var fs = require('fs');

const PORT = 8080;

fs.readFile('./src/index.html', function(err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    }).listen(PORT);
});


/*
var express = require('express');
var server = express();
server.get('./src/index.html', function(request, response) {
    response.sendfile('.\\src\\index.html');
});
server.listen(8080);
*/

/*
var connect = require('connect');
var serveStatic = require('serve-static');

connect()
    .use(serveStatic('./src/index.html'))
    .listen(8080, () => console.log('Server running on 8080...'));
*/