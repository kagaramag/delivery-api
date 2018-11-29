process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let app = require('../app');
let should = chai.should();
let users = require('../v1/routes/users');
let parcels = require('../v1/routes/parcels');


chai.use(chaiHttp);


// //Our parent block
// describe('Users', () => {
//     // get all parcels /GET /parcels
//     describe('/GET parcels', () => {
//         it('it should GET all users', (done) => {
//           chai.request(app)
//             .get('/api/v1/users')
//             .end((err, res) => {
//                 should.not.exist(err);
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');;
//             done();
//             });
//         });
//     });
//     // POST User
//     describe('/GET users', () => {
//         const id = 1;
//         it(`it should get parcels of users ${id}`, (done) => {
//             chai.request(app)
//             .get(`/api/v1/users/${id}/parcels`)
//             .end((err, res) => {
//                 should.not.exist(err);
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');;
//             done();
//             });
//         });
//     });
//     // Get user details id /GET /parcels/:id
//     describe('/GET user details', () => {
//         const id = 1;
//         it(`it should GET a user with id: ${id}`, (done) => {
//             chai
//             .request(app)
//             .get(`/api/v1/users/${id}`)
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