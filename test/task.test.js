const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Task API Tests', function() {
    this.timeout(10000); //account for christian being located outside of Aus for tests
    let createdTaskId = null;

    // Test for creating a new task
    describe('POST /api/tasks', function() {
        it('should create a new task and return the task data', function(done) {
            const testTaskData = {
                posterId: 'Test task posterId',
                datePosted: '1900-01-01',
                title: 'Test Task Title',
                description: 'Test Task Description',
                dueDate: '2050-01-01',
                pay: 10,
                location: 'Test Task Location',
                category: 'Test Task Category',
                imagePath: '/path'
            };

            chai.request(server)
                .post('/api/tasks')
                .send(testTaskData)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    createdTaskId = res.body._id; // Save the created task ID for further tests
                    expect(res.body).to.have.property('posterId', testTaskData.posterId);
                    expect(res.body).to.have.property('datePosted', '1900-01-01T00:00:00.000Z');
                    done();
                });
        });
    });

    // Test for retrieving all tasks
    describe('GET /api/tasks', function() {
        it('should get all tasks', function(done) {
            chai.request(server)
                .get('/api/tasks')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // Test for task id search
    describe('GET /api/tasks/:id', function() {
        it('should retrieve a task by id', function(done) {
            chai.request(server)
                .get(`/api/tasks/${createdTaskId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id', createdTaskId);
                    done();
                });
        });
    });

    // Test for task update
    describe('PUT /api/tasks/:id', function() {
        it('should update a task by id', function(done) {
            const updatedTaskData = {
                description: 'Updated task description',
                pay: 20
            };

            chai.request(server)
                .put(`/api/tasks/${createdTaskId}`)
                .send(updatedTaskData)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id', createdTaskId);
                    expect(res.body).to.have.property('description', updatedTaskData.description);
                    expect(res.body).to.have.property('pay', updatedTaskData.pay);
                    done();
                });
        });
    });

    // Test for task delete
    describe('DELETE /api/tasks/:id', function() {
        it('should delete a task by id', function(done) {
            chai.request(server)
                .delete(`/api/tasks/${createdTaskId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id', createdTaskId);
                    done();
                });
        });
    });

});
