const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;


//to access postgres
const { Pool } = require("pg");

var pool = new Pool({
  // connectionString: process.env.DATABASE_URL || "postgres://postgres:root@localhost/cmpt276",
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
    }
})

// to set up server
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.get("/", (req, res) => {
  var getUsersQuery = `SELECT * FROM student`;
  pool.query(getUsersQuery, (error, result) => {
    if (error) {
      res.send(error);
      return;
    }
    console.log("result",result);
    if (result.rowCount === 0) {
      res.redirect("/addNewUser");
    }
    else {
    console.log("result",result.rows);
    console.log("result.rows[0].name",result.rows[0].name);
    var results = { 'rows': result.rows };
    res.render("pages/db", results);
    }
  });
});

app.get("/addnewuser", (req, res) => {
  res.render("pages/addNewUser");
});


app.get("/adduser", (req, res) => {
  res.render("pages/addUser");
});

app.post("/adduser", (req, res) => {
  console.log("post request for /adduser");
  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var haircolor = req.body.haircolor;
  var gpa = req.body.gpa;
  // var getUsersQuery = `INSERT INTO student (name, weight, height, haircolor, gpa) VALUES ('${name}','${weight}','${height}','${haircolor}','${gpa}')`;
  // var getUsersQuery = "INSERT INTO student VALUES ('will2', 125,100,'red',2.5)";
  // var getUsersQuery = "INSERT INTO student (name, weight, height, hcolor, gpa) VALUES ('" + name + "', " + weight + " , " + height + ",'" + haircolor + "', " + gpa + ")";

  console.log("post request for getUsersQuery");
  pool.query('INSERT INTO student VALUES ($1, $2, $3, $4, $5)', [name, weight, height, haircolor, gpa], (error, result) => {
    if (error) {
      res.send(error);
      return;
    }
    console.log("post request for pool.query");
    // var results = { 'rows': result.rows };
    // res.render("pages/db", results);
    res.redirect("/");
  });
  console.log("post request for after getUsersQuery");

});

app.post("/addnewuser", (req, res) => {
  console.log("post request for /addnewuser");
  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var haircolor = req.body.haircolor;
  var gpa = req.body.gpa;
  // var getUsersQuery = `INSERT INTO student (name, weight, height, haircolor, gpa) VALUES ('${name}','${weight}','${height}','${haircolor}','${gpa}')`;
  // var getUsersQuery = "INSERT INTO student VALUES ('will2', 125,100,'red',2.5)";
  // var getUsersQuery = "INSERT INTO student (name, weight, height, hcolor, gpa) VALUES ('" + name + "', " + weight + " , " + height + ",'" + haircolor + "', " + gpa + ")";

  console.log("post request for getUsersQuery");
  pool.query('INSERT INTO student VALUES ($1, $2, $3, $4, $5)', [name, weight, height, haircolor, gpa], (error, result) => {
    if (error) {
      res.send(error);
      return;
    }
    console.log("post request for pool.query");
    // var results = { 'rows': result.rows };
    // res.render("pages/db", results);
    res.redirect("/");
  });
  console.log("post request for after getUsersQuery");

});

app.post("/deleteduser", (req, res) => {
  console.log("post request for /deleteduser");

  var uid = req.body.rowID;
  console.log("uid", req.body.rowID);

  pool.query('DELETE FROM student WHERE id= $1', [uid], (error, result) => {
    if (error) {
      res.send(error);
      return;
    }
    console.log("post request for pool.query");
    // var results = { 'rows': result.rows };
    // res.render("pages/db", results);
    res.redirect("/");
  });
  console.log("post request for after getUsersQuery");

});


app.post("/changeduser", (req, res) => {
  console.log("post request for /changeduser");

  var uid = req.body.rowID;
  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var haircolor = req.body.haircolor;
  var gpa = req.body.gpa;
  console.log("req.body", req.body);
  // var getUsersQuery = `INSERT INTO student (name, weight, height, haircolor, gpa) VALUES ('${name}','${weight}','${height}','${haircolor}','${gpa}')`;
  // var getUsersQuery = "INSERT INTO student VALUES ('will2', 125,100,'red',2.5)";
  // var getUsersQuery = "INSERT INTO student (name, weight, height, hcolor, gpa) VALUES ('" + name + "', " + weight + " , " + height + ",'" + haircolor + "', " + gpa + ")";

  pool.query('UPDATE student SET name = $1, weight = $2, height = $3, haircolor = $4, gpa = $5 WHERE id= $6 ', [name, weight, height, haircolor, gpa, uid], (error, result) => {
    console.log("result",result);
    if (error) {
      res.send(error);
      return;
    }
    console.log("INSIDE UPDATE student SET name = $1, weight = $2, height = $3, haircolor = $4");
    // var results = { 'rows': result.rows };
    // res.render("pages/db", results);
    res.redirect("/");
  });
  console.log("AFTER UPDATE student SET name = $1, weight = $2, height = $3, haircolor = $4");

});


app.get("/changeuser", (req, res) => {
  console.log("req.body inside /changeuser",req.body);

  res.render("pages/changeUser");
});

app.post("/changeuser", (req, res) => {

  var userID = req.body.rowID;

  console.log("userID inside /changeuser",userID);

  // here suppose to search data base using the uid (user id)

  // var getUsersQuery = `SELECT * FROM student WHERE id = $1`;
  pool.query(`SELECT * FROM student WHERE id = $1`, [userID], (error, result) => {
    if (error) {
      res.send(error);
      return;
    }
    console.log("result",result.rows);
    console.log("result.rows[0].name",result.rows[0].name);
    var results = { 'rows': result.rows };

    res.render("pages/changeUser", results);
  });
  
});


app.post("/deleteuser", (req, res) => {

  var userID = req.body.rowID;

  console.log("userID inside /deleteuser",userID);

  // here suppose to search data base using the uid (user id)

  // var getUsersQuery = `SELECT * FROM student WHERE id = $1`;
  pool.query(`SELECT * FROM student WHERE id = $1`, [userID], (error, result) => {
    if (error) {
      res.send(error);
      return;
    }
    console.log("result",result.rows);
    console.log("result.rows[0].name",result.rows[0].name);
    var results = { 'rows': result.rows };

    res.render("pages/deleteUser", results);
  });
  
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
