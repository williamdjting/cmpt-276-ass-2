const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const psqlPassword = '123psql'

//to access postgres
const { Pool } = require("pg");
var pool;
pool = new Pool({
  connectionString: `postgres://postgres:${psqlPassword}@localhost/student`,
});

// to set up server
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/database", (req, res) => {
  var getUsersQuery = `SELECT * FROM student`;
  pool.query(getUsersQuery, (error, result) => {
    if (error) {
      res.end(error);
    }
    console.log("result",result.rows);
    console.log("result.rows[0].name",result.rows[0].name);
    var results = { 'rows': result.rows };
    res.render("pages/db", results);
  });
});

app.post("/adduser", (req, res) => {
  console.log("post request for /adduser");
  var uname = req.body.uname;
  var age = req.body.age;
  // res.send(`usersname: ${uname}, age: ${age}`);
  var addUserData = { userName: { uname }, userAge: { age } };
  console.log("addUserData object", addUserData);
  console.log("addUserData.userName object", addUserData.userName);
  console.log("addUserData.userAge object", addUserData.userAge);
  res.render("pages/addUser", addUserData);
});

app.get("/users/:id", (req, res) => {
  var uid = req.params.id;
  console.log(req.params.id);
  // here suppose to search data base using the uid (user id)
  res.send("got it!");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
