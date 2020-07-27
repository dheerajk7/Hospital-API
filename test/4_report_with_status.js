const chai = require("chai");
const chaiHttp = require("chai-http");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

describe("Hospital-API", () => {
  describe("/GET /reports/:status", () => {
    //Getting all the report with particular status
    it("Check for getting all the reports with particular status", (done) => {
      let status = "negative"; //its not case sensitive
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
    //Getting all the report with particular status
    it("Check for getting all the reports by passing Invalid Status", (done) => {
      status = "Admitted";
      chai
        .request("http://localhost:8000/")
        .get(`reports/${status}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(402);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            "Status value is incorrect...values can be only Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit"
          );
          done();
        });
    });
  });
});
