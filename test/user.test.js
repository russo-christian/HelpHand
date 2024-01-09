const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Adjust the path according to your project structure
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API Tests', () => {

    // Test for creating a new user
    describe('POST /api/users', () => {
        it('should create a new user', (done) => {
            chai.request(server)
                .post('/api/users')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'test123',
                    firstName: 'Test',
                    lastName: 'User',
                    dateOfBirth: '1990-01-01'
                })
                .end((err, res) => {
                    //console.log(res);
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });
    });

    // Test for retrieving all users
    describe('GET /api/users', () => {
        it('should get all users', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

});