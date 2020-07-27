const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

const authorizationToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkNzEyYTI3ZTU3YTQyMmM4YjZhZGQiLCJwaG9uZSI6IjcwNjc3NzcyNTMiLCJuYW1lIjoiRGhlZXJhaiBLdXNod2FoIiwiaWF0IjoxNTk1ODQ0NTY1LCJleHAiOjE1OTU5NDQ1NjV9.csjLNgtxiumsixGUbgL1BSbVqlRPAmZ2yfthebe0L50";

describe("Hospital-API", () => {
  describe("/Post /patient/register", () => {
    it("Check for Patient Already exist with these number", (done) => {
      chai
        .request("http://localhost:8000/")
        .post("patients/register")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          name: "VERMA",
          phone: "1595846896370",
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.data.should.have.property("patient");
          response.body.data.patient.should.have.property("_id");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            "Patient already exist with this mobile number"
          );
          done();
        });
    });
    it("Check New Patient Registration", (done) => {
      chai
        .request("http://localhost:8000/")
        .post("patients/register")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          name: "VERMA",
          phone: Date.now(),
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }

          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.data.should.have.property("patient");
          response.body.data.patient.should.have.property("_id");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            "Patient registered Successfully"
          );
          done();
        });
    });
  });
});
