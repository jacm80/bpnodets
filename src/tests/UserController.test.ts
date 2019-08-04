import * as app from '../app/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
let _TOKEN_BEARER = null;
const credentials = { email: 'montenegrogerson@gmail.com', password: '123456' };

describe('bpnodets Backend test controller UserController', () => {
    it('it should GET access_token', (done) => {
    chai.request(app)
        .post('/api/v1/authenticate')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(credentials)
        .end((err, res) => {
            console.log(res.body)
            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            _TOKEN_BEARER = res.body.access_token;
            done();
        });
    });
});

