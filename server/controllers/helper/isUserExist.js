const db = require("../../config/database");
const { promisify } = require("util");
const dbGet = promisify(db.get.bind(db));

const tableName='logindata';

async function isUserExist(email) {
    let query = `SELECT * FROM ${tableName} WHERE email=?`;
    try {
      const row = await dbGet(query, [email]);
      if (row === undefined) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.error(`error occur while checking user ${err.message}`);
      throw err;
    }
  }


  module.exports=isUserExist;