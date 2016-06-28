const storage = require('./data.js');

exports.requestHandler = function (request, response) {
  const url = request.url;
  const statusCode = 200;
  const headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10, // Seconds
    'Content-Type': 'application/json'
  };

  console.log(`Serving request type ' + ${request.method} + ' for url ' + ${url}`);

  if (url === '/classes/room1') {
    response.writeHead(statusCode, headers);

    if (request.method === 'GET') {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(storage.data));
    }
    if (request.method === 'POST') {
      let body = '';
      response.writeHead(201, headers);

      request.on('data', (chunk) => {
        body += chunk;
      });
      request.on('end', () => {
        storage.data.results.push(JSON.parse(body));
        console.log('db', storage.data);
        response.end(JSON.stringify(storage.data.results));
      });
    }
    if (request.method === 'OPTIONS') {
      response.writeHead(statusCode, headers);
      response.end(null);
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
};
