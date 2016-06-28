/* Import node's http module: */
const http = require('http');
const handler = require('./request-handler.js');

const port = 3000;
const ip = '127.0.0.1';

const server = http.createServer(handler.requestHandler);
server.listen(port, ip);
