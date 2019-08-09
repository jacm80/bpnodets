import * as dotenv from 'custom-env';
import supertest = require('supertest');
const should = require('should');

let _TOKEN_BEARER = null;
let _ID_USER = null; 
const credentials = { email: 'montenegrogerson@gmail.com', password: '123456' };

const server = supertest.agent(`http://localhost:9000`);

describe('bpnodets Backend test controller UserController', () => {
    
    it('it should GET token', (done) => {
        server
        .post('/api/v1/authenticate')
        .expect('Content-Type', 'application/json')
        .expect('Accept', 'application/json')
        .expect(200)
        .send(credentials)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.success.should.be.equal(true);
            _TOKEN_BEARER = res.body.token;
            done();
        });
    });

    it('it should GET all users', (done) => {
        server
        .get('/api/v1/users')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('authorization', _TOKEN_BEARER)
        .query({ page: 0, itemsPerPage: 10 })
        .send(credentials)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.success.should.be.equal(true);
            res.body.should.have.property('data');
            res.body.should.be.object
            res.body.data.should.be.array
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
        server            
        .post('/api/v1/users')
        .set('authorization', _TOKEN_BEARER)
        .expect('Content-Type', 'application/json')
        .expect('Accept', 'application/json')
        .expect('Authorization', _TOKEN_BEARER)
        .expect(200)
        .send(newUsers)
        .expect(201)
        .end((err, res) => {
            res.status.should.equal(201);
            res.body.success.should.be.equal(true);
            res.body.should.have.property('data');
            res.body.should.be.object
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('birth');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('password');
            res.body.data.should.have.property('updatedAtDate');
            res.body.data.should.have.property('group');
            res.body.data.group.should.be.array;
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
        server
        .put(`/api/v1/users/${_ID_USER}`)
        .set('authorization', _TOKEN_BEARER)
        .expect('Content-Type', 'application/json')
        .expect('Accept', 'application/json')
        .expect('Authorization', _TOKEN_BEARER)
        .send(updateFields)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.success.should.be.equal(true);
            res.body.should.have.property('data');
            res.body.should.be.a.object;
            done();
        });
    });

    it('it should delete user', (done) => {
    server
        .delete(`/api/v1/users/${_ID_USER}`)
        .set('authorization', _TOKEN_BEARER)
        .expect('Content-Type', 'application/json')
        .expect('Accept', 'application/json')
        .expect('Authorization', _TOKEN_BEARER)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.success.should.be.equal(true);
            res.body.should.be.a.object;
            done();
        });
    });

});

