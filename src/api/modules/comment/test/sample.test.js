
const should = require('chai').should();
const supertest = require('supertest');
const api = supertest('http://localhost:3003');

describe('Authentication', function() {

  it('errors if wrong basic auth', function(done) {
    api.get('/blog')
    .set('Authorization', '123myapikey')
    .auth('incorrect', 'credentials')
    .expect(401, done)
  });

  it('errors if bad Authorization header', function(done) {
    api.get('/blog')
    .auth('correct', 'credentials')
    .expect(401)
    .expect({ error:"Bad or missing app identification header" }, done);
  });

});


describe('/blog', function() {

  it('returns blog posts as JSON', function(done) {
    api.get('/blog')
    .set('Authorization', '123myapikey')
    .auth('correct', 'credentials')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('posts').and.be.instanceof(Array);
      done();
    });
  });

});