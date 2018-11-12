process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let app = require('../app');
let should = chai.should();
let parcels = require('../v1/routes/parcels');


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
    // POST Parcel
    describe('/POST parcels', () => {
        it('it should create parcel order', (done) => {
            chai.request(app)
            .post('/api/v1/parcels')
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