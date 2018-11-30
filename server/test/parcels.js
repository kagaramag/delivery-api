process.env.NODE_ENV = 'test';
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
// import server from '../server';
// let app = require('../app');
import app from '../app';
let should = chai.should();

import jwt from "jsonwebtoken";
import Auth from '../db/jwt';
// import parcels from '../v1/routes/parcels';


chai.use(chaiHttp);

const user = {
  email: 'test@test.com',
  name: 'John Doe',
  password: '123123',
  state: 'active',
  role: '1'
};
// sign up
describe('POST signup', () => {
    it('It should sign up a new user', (done) => {
      chai.request(app).post('/api/v1/auth/signup').send(user).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    });
    // check if user attempt to sign up again
    it('User shouldn\'t not sign up again', (done) => {
      chai.request(app).post('/api/v1/auth/signup').send(user).end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    });

    // check if user attempt to sign up again
    it('User should login', (done) => {
      chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email:user.email, password:user.password})
      .end((err, res) => {
        res.should.have.status(200);
        const token = res.body.token;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
    });

    // check if user attempt to sign up again
    // it('User should be deleted', (done) => {
    //   chai
    //   .request(app)
    //   .delete('/api/v1/auth/delete')
    //   .send({ email:user.email})
    //   .end((err, res) => {
    //     res.should.have.status(200);
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('token');
    //     done();
    //   });
    // });

  });
// describe('Parcels delivery orders', () => {
//   // clearn data before any testing 
//     // Get parcel id /GET /parcels/:id
//     describe('/GET parcel details', () => {
//         it('it should GET a parcel delivery order', (done) => {
//             const id = 1;
//             chai
//             .request(app)
//             .get(`/api/v1/parcels/${id}`)
//             .end((err, res) => {
//                 should.not.exist(err);
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//             done();
//             });              
//         });
//     });
// });

module.exports = app;