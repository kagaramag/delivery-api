process.env.NODE_ENV = 'tes';

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

let Parcels = require("../v1/routes/parcels");

chai.use(chaiHttp);

describe('Parcels', () =>{
    // start by clearing db
    beforeEach((done) => {
        // Parcels.remove({}, (err) => {
            // done();
        // });
        // setTimeout(function() {
        //     console.log("timeout set to 10s");
        //     run();
        // }, 10000);
        // done();
    });
    describe("/GET Parcels", () =>{
        // it('It should GET all parcels', (done) =>{
        //     chai.request(server)
        //     .get('/api/v1/parcels')
        //     .end((err,res) =>{
                // res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.lenght.should.be.eql(0);
            // done();
            // })
        // });
    });
});
