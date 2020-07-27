const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

describe("Hospital-API", () => {
  describe("/GET /patient/:id/all_reports", () => {
    //Getting all the report with patient ID
    it("Check for getting all the reports with patient ID", (done) => {
      chai
        .request("http://localhost:8000/")
        .get("patients/5f1d71d227e57a422c8b6ade/all_reports")
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.data.should.have.property("patient");
          response.body.data.should.have.property("reports");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("All reports Received");
          done();
        });
    });
    //check case when invalid patient ID is passed for getting report
    it("Check for Invalid patient ID passed for getting all reports", (done) => {
      chai
        .request("http://localhost:8000/")
        .get("patients/1232232/all_reports") //passing wrong patient ID
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
