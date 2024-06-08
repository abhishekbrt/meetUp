const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const bcrypt = require("bcrypt");
const isUserExist = require("../helper/isUserExist");
require("dotenv").config();
const { promisify } = require("util");
const dbGet = promisify(db.get.bind(db));

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    const checkUserExist = await isUserExist(email);
    if (!checkUserExist) {
      return res.json({
        message: "Email didn't Exists. Please Register !!",
      });
    }
    
    const query = `SELECT password FROM logindata WHERE email=?`;
    const hashedPassword = await dbGet(query, [email]);
  

    const passwordMatched = await bcrypt.compare(
      password,
      hashedPassword.password
    );
    console.log('passwordMatched',passwordMatched);

    if (passwordMatched) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);

      //set cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        path: "/", // Set the path to restrict cookie access to /api and its sub-paths
      });

      res.status(201).json({
        token: token,
        message: "Login Successfull!",
      });
    } else {
      res.status(401).json({ message: "Wrong Password" });
    }
  } catch (err) {
    console.log("error while login error :", err);
    res.json({ message: "Interval Server Error" });
  }
};

module.exports = login;
