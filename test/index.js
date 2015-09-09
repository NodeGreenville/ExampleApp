var app = require('../server.js');
var request = require('supertest');

describe('GET /', function(){
  it('should return a 200', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('POST /api/v1/login', function(){
  it('should respond with a 201', function(done){
    request(app)
      .post('/api/v1/login')
      .send({ username: "Test User" })
      .expect(201, done);
  });
});
