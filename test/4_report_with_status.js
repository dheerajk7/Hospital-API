const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

describe("Hospital-API", () => {
  describe("/GET /reports/:status", () => {
    //Getting all the report with patient ID
    it("Check for getting all the reports with particular status", (done) => {
      let status = "negative";
      chai
        .request("http://localhost:8000/")
        .get(`reports/${status}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.have.property("reports");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            `Report received with status ${status}`
          );
          done();
        });
    });
  });
});
