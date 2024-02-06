const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API Tests', () => {
    let createdUserId = null;

    // Test for creating a new user
    describe('POST /api/users', () => {
        it('should create a new user and return the user data', (done) => {
            const testUserData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'test123',
                firstName: 'Test',
                lastName: 'User',
                dateOfBirth: '1990-01-01',
                currentRating: 4.5,
                tasksHelped: 10,
                admin: false,
                seeker: false
            };    
            chai.request(server)
                .post('/api/users')
                .send(testUserData)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    createdUserId = res.body._id;
                    expect(res.body).to.have.property('username', testUserData.username);
                    expect(res.body).to.have.property('email', testUserData.email);
                    expect(res.body).to.have.property('firstName', testUserData.firstName);
                    expect(res.body).to.have.property('lastName', testUserData.lastName);
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

    // Test for user id search
    describe('GET /api/users/:id', () => {
        it('should retrieve a user by id', (done) => {
            chai.request(server)
                .get(`/api/users/${createdUserId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id', createdUserId);
                    done();
                });
        });
    });

    // Test for username search
    describe('GET /api/users/search/username/:username', () => {
        it('should retrieve a user by username', (done) => {
            chai.request(server)
                .get(`/api/users/search/username/testuser`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('username', 'testuser');
                    done();
                });
        });
    });
    

    // Test for emails search
    describe('GET /api/users/search/email/:email', () => {
        it('should retrieve a user by email', (done) => {
            chai.request(server)
                .get(`/api/users/search/email/test@example.com`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('email', 'test@example.com');
                    done();
                });
        });
    });

    // Test for user update
    describe('PUT /api/users/:id', () => {
        it('should update a user by id', (done) => {
            const updateData = {
                firstName: 'UpdatedName',
                lastName: 'UpdatedLastName',
                tasksHelped: 11,
                seeker: true
            };
    
            chai.request(server)
                .put(`/api/users/${createdUserId}`)
                .send(updateData)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id', createdUserId);
                    expect(res.body).to.have.property('firstName', updateData.firstName);
                    expect(res.body).to.have.property('lastName', updateData.lastName);
                    expect(res.body).to.have.property('tasksHelped', updateData.tasksHelped);
                    expect(res.body).to.have.property('seeker', updateData.seeker);
                    done();
                });
        });
    });

    // Test for user delete
    describe('DELETE /api/users/:id', () => {
        it('should delete a user by id', (done) => {
            chai.request(server)
                .delete(`/api/users/${createdUserId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    chai.request(server).get(`/api/users/${createdUserId}`).end(/* ... */);
                    done();
                });
        });
    });

});