const express = require("express");
const port = 8000;
const app = express();
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

app.use(express.urlencoded());
app.use(passport.initialize());

//using router
app.use("/", require("./routes/index.js"));

//connecting to database
const db = require("./config/mongoose");

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server");
    return;
  }
  console.log("Server is running and up at port ", port);
  return;
});
