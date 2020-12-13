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
  // url types: filepath or url
  // if filepath, ends in .jpg
  // if not, its a url
  //( req.url.endsWith('.jpg')
  console.log(req.url);

  if (req.method === 'GET') {
    if (fs.existsSync(req.url) && req.url.endsWith('.jpg')) {
      res.writeHead(200, headers);
      res.end();
    } else if (fs.existsSync(req.url)) {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
    } else {
      res.writeHead(404, headers);
      res.end();
    }
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  next(); // invoke next() at the end of a request to help with testing!
};
