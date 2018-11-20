process.env.NODE_ENV = 'test';
const babel = require('babel-core');
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
// import server from '../server';
// let app = require('../app');
import app from '../app';
let should = chai.should();
// import parcels from '../v1/routes/parcels';
// babel.transform(data, {
//     presets: ['babel-preset-babili'],
//     plugins,
//     compact: true,
//     comments: false
//   });

chai.use(chaiHttp);


//Our parent block
describe('Parcels delivery orders', () => {
  // clearn data before any testing 
    // get all parcels /GET /parcels
    describe('/GET parcels', () => {
        it('it should GET all the parcels', (done) => {
          chai.request(app)
            .get('/api/v1/parcels')
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');;
            done();
            });
        });
    });
    // Get parcel id /GET /parcels/:id
    describe('/GET parcel details', () => {
        it('it should GET a parcel delivery order', (done) => {
            const id = 1;
            chai
            .request(app)
            .get(`/api/v1/parcels/${id}`)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
            });              
        });
    });
});

module.exports = app;