const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const {promisify}=require('util');
const dbGet=promisify(db.get.bind(db));
require("dotenv").config();

const verifyUser = async (req, res) => {
  try {
    const codeFromClient = req.body.verificationCode.toString();
    const email = req.body.email;
    const query = `SELECT verificationCode FROM logindata WHERE email=?`;
    const codeFromServer = await dbGet(query, [email]);
   

    if (codeFromClient === codeFromServer.verificationCode) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);

      res.status(201).json({
        token:token,
        message: "Email verified!",
      });
      
    } else {
      res.status(403).json({
        message: "Incorrect Code",
      });
    }
  } catch (err) {
    res.status(500).send("internal server error : " + error);
  }
};

module.exports = verifyUser;
