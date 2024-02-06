const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server', () => {
    describe('/GET files', () => {
        it('it should GET the index page', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });

        describe('/GET index', () => {
            it('should GET the index page', (done) => {
                chai.request(server)
                    .get('/')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });
    
        describe('/GET login', () => {
            it('should GET the login page', (done) => {
                chai.request(server)
                    .get('/login')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });
    
        describe('/GET Howitworks', () => {
            it('should GET the How it works page', (done) => {
                chai.request(server)
                    .get('/Howitworks')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });
    
        describe('/GET Helper', () => {
            it('should GET the Helper page', (done) => {
                chai.request(server)
                    .get('/Helper')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });
    
        describe('/GET profile', () => {
            it('should GET the profile page', (done) => {
                chai.request(server)
                    .get('/profile')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });
    
        describe('/GET task', () => {
            it('should GET the Task page', (done) => {
                chai.request(server)
                    .get('/task')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });

        describe('/GET login1', () => {
            it('should GET the login1 page', (done) => {
                chai.request(server)
                    .get('/login1')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });

        describe('/GET complete-registration', () => {
            it('should GET the complete registration page', (done) => {
                chai.request(server)
                    .get('/complete-registration')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });

        describe('/GET browse-task', () => {
            it('should GET the browse task page', (done) => {
                chai.request(server)
                    .get('/browse-task')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.html;
                        done();
                    });
            });
        });
    });
});