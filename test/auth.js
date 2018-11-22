process.env.NODE_ENV = 'test';

//Require the dev-dependencies

import chai from 'chai';
import chaiHttp from 'chai-http';

// import app file
import app from '../app';

// use should in unit testing
let should = chai.should();

// user chai-http middleware
chai.use(chaiHttp);

//Our parent block
describe('Auth HTTP Verbs', () => {
    const user = {
		"id": 1,
		"name": "TestUser",
		"email": "lacus@ametconsectetuer.edu",
		"password": "6253",
		"state": "inactive",
		"role": "client",
		"created_time": "2018-02-19"        
    };
    it(`User should be able to sign up`, (done) => {
        chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
    it(`User should be able to login`, (done) => {
        chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

module.exports = app;