const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
// need acccess to messageQueue here?
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

//let messageQueue = null;
module.exports.initialize = (queue) => {
  console.log(`got your message! you typed ${queue}`);
  //messageQueue.dequeue();
};

// put responses to GET, POST, OPTIONS, ETC in here
module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
  }


  // randoCommandHere
  // const randomCommands = ['up', 'down', 'left', 'right'];
  // let randomSwimCommand = randomCommands[Math.floor(Math.random() * randomCommands.length)];

  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // res.writeHead(200, headers);
  // console.log('Server responding to ' + req.method + ' with: ' + randomSwimCommand);
  // res.end(randomSwimCommand);
  next(); // invoke next() at the end of a request to help with testing!
};
