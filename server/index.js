
const httpHandler = require('./js/httpHandler');
const messageQueue = require('./js/messageQueue');
// can now access server httpHandler's .initialize?

const keypressHandler = require('./js/keypressHandler');
// keypress .initialize allows typing/server terminal input
keypressHandler.initialize((message) => {
  console.log(`Message received: ${message}`)
  // httpHandler.initialize(message)
  messageQueue.enqueue(message);
  //console.log(`preparing to send command '${message}' to client...`);
});

const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
