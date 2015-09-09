var app = require('../server.js');
var request = require('supertest');

describe('GET /', function(){
  it('should return a 200', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  });
});
