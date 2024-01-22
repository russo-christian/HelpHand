const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Task API Tests', () => {
    let createdTaskId = null;

    // Test for creating a new task
    describe('POST /api/tasks', () => {
        it('should create a new task and return the task data', (done) => {
            const testTaskData = {
                posterId: 'Test task posterId',
                datePosted: '1900-01-01',
                description: 'Test task description',
                pay: '$10.00'
            };
    
            chai.request(server)
                .post('/api/tasks')
                .send(testTaskData)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    createdTaskId = res.body._id;
                    expect(res.body).to.have.property('posterId', testTaskData.posterId);
                    expect(res.body).to.have.property('datePosted', '1900-01-01T00:00:00.000Z');
                    expect(res.body).to.have.property('description', testTaskData.description);
                    expect(res.body).to.have.property('pay', testTaskData.pay);
                    done();
                });
        });
    });

    // Test for retrieving all tasks
    describe('GET /api/tasks', () => {
        it('should get all tasks', (done) => {
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
    describe('GET /api/tasks/:id', () => {
        it('should retrieve a task by id', (done) => {
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
    describe('PUT /api/tasks/:id', () => {
      it('should update a task by id', (done) => {
          const updatedTaskData = {
              description: 'Updated task description',
              pay: '$20.00'
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
    describe('DELETE /api/tasks/:id', () => {
      it('should delete a task by id', (done) => {
          chai.request(server)
              .delete(`/api/tasks/${createdTaskId}`)
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('_id', createdTaskId);
                  chai.request(server).get(`/api/tasks/${createdTaskId}`).end(/* ... */);
                  done();
              });
      });
  });

});