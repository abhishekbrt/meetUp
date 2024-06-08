const db = require("../../config/database");
const { promisify } = require("util");
const dbRun = promisify(db.run.bind(db));


const isUserOnline = async (req, res) => {

  const{flag}=req.body;
  console.log(flag);
  const email = req.user.email;
  const query = `UPDATE logindata
    SET isOnline =?
    WHERE email=?
    `;
  try {
    await dbRun(query, [flag,email]);
  } catch (err) {
    console.log("error while updating:", err);
  }
  return res
    .status(201)
    .json({ message: "message recieved and token parsed!" });
};

module.exports = isUserOnline;