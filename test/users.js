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
describe('Test Users HTTP Verbs', () => {
    const id = 1;
    it(`it should get parcels of users ${id}`, (done) => {
        chai.request(app)
        .get(`/api/v1/users/${id}/parcels`)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.parcels.should.be.a("array");
            res.body.should.be.a('object');;
            done();
        });
    });
});

module.exports = app;