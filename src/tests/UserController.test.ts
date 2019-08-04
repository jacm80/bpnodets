import * as app from '../app/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
let _TOKEN_BEARER = null;
const credentials = { email: 'montenegrogerson@gmail.com', password: '123456' };

describe('bpnodets Backend test controller UserController', () => {
    it('it should GET token', (done) => {
        chai.request(app)
            .post('/api/v1/authenticate')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(credentials)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                _TOKEN_BEARER = res.body.token;
                done();
            });
    });
    it('it should GET all users', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('authorization', _TOKEN_BEARER)
            .query({ page: 0, itemsPerPage: 10 })
            .send(credentials)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.should.have.property('data');
                res.body.should.be.a('object');
                res.body.data.should.be.a('array');
                done();
            });
    });
});

