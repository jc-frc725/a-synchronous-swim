
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const server = require('./mockServer');

const httpHandler = require('../js/httpHandler');



describe('server responses', () => {

  it('should respond to a OPTIONS request', (done) => {
    let {req, res} = server.mock('/', 'OPTIONS');

    httpHandler.router(req, res);
    expect(res._responseCode).to.equal(200);
    expect(res._ended).to.equal(true);
    expect(res._data.toString()).to.be.empty;

    done();
  });

  it('should respond to a GET request for a swim command', (done) => {
    // write your test here
    // send a response of a random swim command
    // create mock server, with GET request type, response of swim command
    let {req, res} = server.mock('/', 'GET');

    // before calling router, write data for response?
    // in mock response, write the data it should return to be a rando swim command
    const randomCommands = ['up', 'down', 'left', 'right'];
    let randomSwimCommand = randomCommands[Math.floor(Math.random() * randomCommands.length)];
    //res.write(randomSwimCommand);

    // make an HTTP GET request to mock server
    httpHandler.router(req, res, () => console.log(`Wow! You made a GET request! It\'s a ${randomSwimCommand}`));

    // HTTP response code should be 200 = 'success'
    expect(res._responseCode).to.equal(200);
    // response should end after request?
    expect(res._ended).to.equal(true);
    // we DO need data back in form of random swim command(?)
    // to insert data, use res.write(data)? does this happen before or after expect tests?
    expect(res._data.toString()).to.not.be.empty;
    expect(randomSwimCommand).to.include(res._data.toString());
    done();
  });

  xit('should respond with 404 to a GET request for a missing background image', (done) => {
    httpHandler.backgroundImageFile = path.join('.', 'spec', 'missing.jpg');
    let {req, res} = server.mock('FILL_ME_IN', 'GET');

    httpHandler.router(req, res, () => {
      expect(res._responseCode).to.equal(404);
      expect(res._ended).to.equal(true);
      done();
    });
  });

  xit('should respond with 200 to a GET request for a present background image', (done) => {
    // write your test here
    done();
  });

  var postTestFile = path.join('.', 'spec', 'water-lg.jpg');

  xit('should respond to a POST request to save a background image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      let {req, res} = server.mock('FILL_ME_IN', 'POST', fileData);

      httpHandler.router(req, res, () => {
        expect(res._responseCode).to.equal(201);
        expect(res._ended).to.equal(true);
        done();
      });
    });
  });

  xit('should send back the previously saved image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      let post = server.mock('FILL_ME_IN', 'POST', fileData);

      httpHandler.router(post.req, post.res, () => {
        let get = server.mock('FILL_ME_IN', 'GET');
        httpHandler.router(get.req, get.res, () => {
          expect(Buffer.compare(fileData, get.res._data)).to.equal(0);
          done();
        });
      });
    });
  });
});
