const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

describe("Hospital-API", () => {
  describe("/GET /api/v1/reports/negative", () => {
    it("It should get all reports", (done) => {
      chai
        .request("http://localhost:8000/")
        .get("reports/negative")
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          response.should.have.status(200);
          done();
        });
    });
    it("It should not get all reports", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/reports/negative")
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          response.should.have.status(404);
          done();
        });
    });
  });
});
