import dotenv from 'custom-env';
import chai from 'chai';
import chaiHttp = require('chai-http');
const app = require('../app/app');

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const cfg: any = require(`../../config/${NODE_ENV}`);
dotenv.env(NODE_ENV);

const should = chai.should();
chai.use(chaiHttp);
let _TOKEN_BEARER = null;
let _ID_USER = null; 
const credentials = { email: 'montenegrogerson@gmail.com', password: '123456' };

describe('bpnodets Backend test controller UserController', () => {
    it('it should GET token', (done) => {
        chai.request(app)
            .post('/api/v1/authenticate')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(credentials)
            .end((err, res) => {
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
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.should.have.property('data');
                res.body.should.be.a('object');
                res.body.data.should.be.a('array');
                done();
            });
    });
    it('it should POST new user', (done) => {
        const newUsers = {
            firstName:"Juan",
            lastName:"Canepa",
            birth:"1980-10-17",
            email:"jacanepa@gmail.com",
            password:"123456"
        };
        chai.request(app)
            .post('/api/v1/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('authorization', _TOKEN_BEARER)
            .send(newUsers)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.success.should.be.eql(true);
                res.body.should.have.property('data');
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('firstName');
                res.body.data.should.have.property('lastName');
                res.body.data.should.have.property('birth');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('password');
                res.body.data.should.have.property('updatedAtDate');
                res.body.data.should.have.property('group');
                res.body.data.group.should.be.a('array');
                res.body.data.group[0].should.have.property('id');
                res.body.data.group[0].should.have.property('description');
                res.body.data.group[0].should.have.property('createdAtDate');
                res.body.data.group[0].should.have.property('updatedAtDate');
                _ID_USER = res.body.data.id;
                done();
            });
    });
    it('it should update user', (done) => {
        const updateFields = { "email": "jacm1980@gmail.com" }
        chai.request(app)
            .put(`/api/v1/users/${_ID_USER}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('authorization', _TOKEN_BEARER)
            .send(updateFields)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.should.have.property('data');
                res.body.should.be.a('object');
                done();
            });
    });
    it('it should delete user', (done) => {
        chai.request(app)
            .delete(`/api/v1/users/${_ID_USER}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('authorization', _TOKEN_BEARER)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.should.be.a('object');
                done();
            });
    });
});