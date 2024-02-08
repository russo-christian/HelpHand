const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); // Adjust this path to where your server instance is correctly exported
const expect = chai.expect;

chai.use(chaiHttp);

describe("User Registration and Login", () => {
  describe("POST /api/users/create", () => {
    it("should register a new user with default values for rating, tasks, and admin status", (done) => {
      const newUser = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
        dateOfBirth: new Date("1990-01-01").toISOString(),
        location: "Test City",
        seeker: true,
      };

      chai
        .request(server)
        .post("/api/users/create")
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.include.keys(
            "email",
            "username",
            "firstName",
            "lastName",
            "seeker"
          );
          expect(res.body.currentRating).to.equal(4);
          expect(res.body.tasksHelped).to.equal(0);
          expect(res.body.admin).to.be.false;
          done();
        });
    });
  });

  describe("POST /api/users/login", () => {
    it("should authenticate a user and return a success message and user details without password", (done) => {
      const userCredentials = {
        email: "testuser@example.com",
        password: "password123",
      };

      chai
        .request(server)
        .post("/api/users/login")
        .send(userCredentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property(
            "message",
            "Logged in successfully"
          );
          expect(res.body).to.have.property("user");
          expect(res.body.user).to.not.have.property("password");
          expect(res.body.user).to.have.property(
            "email",
            userCredentials.email
          );
          expect(res.body.user).to.have.property("username", "testuser");
          expect(res.body.user).to.have.property("firstName", "Test");
          expect(res.body.user).to.have.property("lastName", "User");
          done();
        });
    });

    it("should not authenticate a user with incorrect credentials", (done) => {
      const wrongCredentials = {
        email: "testuser@example.com",
        password: "wrongPassword",
      };

      chai
        .request(server)
        .post("/api/users/login")
        .send(wrongCredentials)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  //   describe("POST /api/users/create", () => {
  //     it("should not allow registration with an existing username", (done) => {
  //       // Assuming a user with this username already exists in your test database
  //       const userWithExistingUsername = {
  //         username: "testuser", // Existing username
  //         email: "newuser@example.com", // Different email
  //         password: "newPassword123",
  //         firstName: "New",
  //         lastName: "User",
  //         dateOfBirth: new Date("1990-01-02").toISOString(),
  //         location: "New City",
  //         seeker: true,
  //       };

  //       chai
  //         .request(server)
  //         .post("/api/users/create")
  //         .send(userWithExistingUsername)
  //         .end((err, res) => {
  //           expect(res).to.have.status(400); // Or whichever status code you use for such errors
  //           expect(res.body).to.be.an("object");
  //           expect(res.body.message).to.include("username already exists"); // Adjust based on your actual error message
  //           done();
  //         });
  //     });
  //   });

  //   describe("POST /api/users/create", () => {
  //     it("should reject registration with invalid email format", (done) => {
  //       const userWithInvalidEmail = {
  //         username: "uniqueuser123",
  //         email: "notanemail", // Invalid email format
  //         password: "password123",
  //         firstName: "Test",
  //         lastName: "User",
  //         dateOfBirth: new Date("1990-01-01").toISOString(),
  //         location: "Test City",
  //         seeker: true,
  //       };

  //       chai
  //         .request(server)
  //         .post("/api/users/create")
  //         .send(userWithInvalidEmail)
  //         .end((err, res) => {
  //           expect(res).to.have.status(400); // Assuming you return a 400 status for validation failures
  //           expect(res.body).to.be.an("object");
  //           expect(res.body.message).to.include("invalid email format"); // Adjust based on your actual validation message
  //           done();
  //         });
  //     });
  //   });
});
