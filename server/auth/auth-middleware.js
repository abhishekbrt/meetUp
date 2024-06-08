const jwt = require("jsonwebtoken");
const { EMPTY } = require("sqlite3");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  

  if (token === 'null') {
    return res.status(401).json({ message: "token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "invalid token" });
      return;
    }
    req.user=decoded;
    next();
  });
};


module.exports={verifyToken};
