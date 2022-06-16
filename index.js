const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("pages/index"));

app.get("/database", (req, res) => {
  var data = { results: [2, 3, 4, 5, 6, 7] };
  res.render("pages/db", data);
});

app.post("/adduser", (req, res) => {
  console.log("post request for /adduser");
  var uname = req.body.uname;
  var age = req.body.age;
  // res.send(`usersname: ${uname}, age: ${age}`);
  var addUserData = { uname, age };
  console.log("addUserData object", addUserData);
  console.log("addUserData.uname object", addUserData.uname);
  console.log("addUserData.age object", addUserData.age);
  res.render("pages/addUser", addUserData);
});

app.get("/users/:id", (req, res) => {
  var uid = req.params.id;
  console.log(req.params.id);
  // here suppose to search data base using the uid (user id)
  res.send("got it!");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
