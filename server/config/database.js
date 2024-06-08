const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { Database } = require("sqlite3");

const dbPath = path.join(__dirname, "userdata.db");
const pathdb='/home/abhishek/react/meetUp/server/sampleData.db';


let db = new sqlite3.Database(pathdb, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Sample database connected succesfully");
  }
});



// const databaseConnection = (dbPath) => {
//   return new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("sample database connected succesfully");
//     }
//   });
// };
module.exports = db;

