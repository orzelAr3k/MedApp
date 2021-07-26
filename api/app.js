const express = require("express");
const app = express();
const bodyParser = require("body-parser");


const shell_req = require('./http_req/shell');
const timetable_req = require('./http_req/timetable');
const search_req = require('./http_req/search');
const doctor_req = require('./http_req/doctor');
const patient_req = require('./http_req/patient');
const auth_req = require('./http_req/auth');

const PORT = 3000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(bodyParser.json());


// =======================================================


app.use('/specialists', shell_req);
app.use('/timetable', timetable_req);
app.use('/search', search_req);
app.use('/doctor', doctor_req);
app.use('/patient', patient_req)
app.use('/auth', auth_req);


app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
