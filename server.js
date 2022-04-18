const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');
var mysql = require("mysql2");

const app = express();

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "test",
  password: "password",
  database: "y-box"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT COUNT(*) FROM cards", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sp = req.query.sp;
  const cl = req.query.cl;
  const sqlSelect = 'SELECT * FROM cards where sixp = ? and cluster = ?';
  console.log(sqlSelect, sp, cl);
  con.query(sqlSelect, [sp,cl], (err, result) => {
    res.send(result);
  });
  
});

// test 용
app.get("/api/cards", (req, res) => {
  res.send("welcome");

});

// server & client connect code
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);
});
