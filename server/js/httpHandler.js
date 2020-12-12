const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// randoCommandHere

module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end('down');

  }


  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // res.writeHead(200, headers);
  // res.end('hello');
  next(); // invoke next() at the end of a request to help with testing!
};
