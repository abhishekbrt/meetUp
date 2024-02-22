const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db/db.js");
const authUser = require("./db/Auth.user.js");

const port = 3033;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to your server");
});

app.post("/register", async (req, res) => {
  const formData = req.body;
  const email = formData.email;
  const password = formData.password;

  const reply = await authUser.register(email, password);

  res.send(reply);

  console.log(formData);
  console.log("register");

  // db.close((err) => {
  //     if (err) {
  //       console.error(err.message);
  //     }
  //     console.log('database connection closed.');
  //   });
});

app.post("/login", async (req, res) => {
  const formData = req.body;
  const email = formData.email;
  const password = formData.password;
  console.log(req.body);
  console.log("login");

  const reply = await authUser.login(email, password);
  res.send(reply);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
