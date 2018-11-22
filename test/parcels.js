process.env.NODE_ENV = 'test';

//Require the dev-dependencies

import chai from 'chai';
import chaiHttp from 'chai-http';

// import app file
import app from '../app';

// use should in unit testing
let should = chai.should();
let expect = chai.expect;

// user chai-http middleware
chai.use(chaiHttp);

const parcel = {
    "id": 1,
    "id_client": 12,
    "id_postman": 4,
    "title": "In ornare sagittis felis.",
    "description": "est, congue a, aliquet vel,",
    "weight": 1,
    "state": "created",
    "pickup": "porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo",
    "dropoff": "porta elit, a feugiat tellus lorem eu metus. In lorem.",
    "distance": 1,
    "created_time": "2018-11-22",
    "modified_at": "2018-11-22"	
}

//Our parent block
describe('Parcels delivery orders', () => {  
    // get all parcels /GET /parcels
    describe('/GET parcels', () => {
        it('it should GET all the parcels', (done) => {
            const id = 1;
          chai.request(app)
            .get('/api/v1/parcels')
            .end((err, res) => {
                chai.expect(err).to.not.exist;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.parcels.should.be.a("array");
                parcel.should.have.property('id');
                parcel.should.have.property('id_client');
                parcel.should.have.property('title');
                parcel.should.have.property('title');
                parcel.should.have.property('weight');
                parcel.should.have.property('state');
                parcel.should.have.property('weight');
                parcel.should.have.property('pickup');
                parcel.should.have.property('dropoff');
                parcel.should.have.property('distance');
                parcel.should.have.property('created_time');
                parcel.should.have.property('modified_at');
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
                parcel.should.have.property('id');
                parcel.should.have.property('id_client');
                parcel.should.have.property('title');
                parcel.should.have.property('title');
                parcel.should.have.property('weight');
                parcel.should.have.property('state');
                parcel.should.have.property('weight');
                parcel.should.have.property('pickup');
                parcel.should.have.property('dropoff');
                parcel.should.have.property('distance');
                parcel.should.have.property('created_time');
                parcel.should.have.property('modified_at');                
            done();
            });              
        });
    });
    // Get parcel id /GET /parcels/:id
    describe('/GET cancel order', () => {
        it('it should cancel order', (done) => {
            const id = 1;
            chai
            .request(app)
            .put(`/api/v1/parcels/${id}/cancel`)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.a('object');
                // res.should.have.status(200);             
            done();
            });              
        });
    });

    // record new location for destination change
    describe('/PUT new destination', () => {
        it('it should record new location', (done) => {
            const id = 1;
            chai
            .request(app)
            .put(`/api/v1/parcels/${id}/destination`)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.a('object');
                // res.should.have.status(200);             
            done();
            });              
        });
    });

    // updates status
    describe('/PUT update status', () => {
        it('it should update status', (done) => {
            const id = 1;
            chai
            .request(app)
            .put(`/api/v1/parcels/${id}/status`)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.a('object');
                // res.should.have.status(200);             
            done();
            });              
        });
    });

});

module.exports = app;