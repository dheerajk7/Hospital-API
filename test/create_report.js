const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

const authorizationToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkNzEyYTI3ZTU3YTQyMmM4YjZhZGQiLCJwaG9uZSI6IjcwNjc3NzcyNTMiLCJuYW1lIjoiRGhlZXJhaiBLdXNod2FoIiwiaWF0IjoxNTk1ODQ0NTY1LCJleHAiOjE1OTU5NDQ1NjV9.csjLNgtxiumsixGUbgL1BSbVqlRPAmZ2yfthebe0L50";

describe("Hospital-API", () => {
  describe("/Post /patient/:id/create_report", () => {
    it("Check for report creation by passing report status, doctor name and date", (done) => {
      chai
        .request("http://localhost:8000/")
        .post("patients/5f1d71d227e57a422c8b6ade/create_report")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          status: "Negative",
          date: "12-02-2022", //sending report body
          doctor_name: "Dheeraj K",
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.data.should.have.property("report_code");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Report created successfully");
          done();
        });
    });
    it("Check for report creation by passing only report status", (done) => {
      chai
        .request("http://localhost:8000/")
        .post("patients/5f1d71d227e57a422c8b6ade/create_report")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          status: "Negative", //passing only status with report body
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.data.should.have.property("report_code");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Report created successfully");
          done();
        });
    });
    it("Check for Invalid patient ID passed while creating report", (done) => {
      chai
        .request("http://localhost:8000/")
        .post("patients/1232232/create_report")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          status: "Negative", //passing only status with report body
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(402);
          response.body.should.have.property("success").eql(false);
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Invalid Patient ID");
          done();
        });
    });
  });
});
