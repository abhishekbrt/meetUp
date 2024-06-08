const databaseConnection = require("../config/database");

let query = `CREATE TABLE IF NOT EXISTS logindata (
    'id' INTEGER  PRIMARY KEY,
    'email' TEXT NOT NULL,
    'password' TEXT NOT NULL,
    'verificationCode' TEXT NOT NULL,
    'isOnline' INTEGER,
    'isPaired' INTEGER
);`;



databaseConnection.run(query, (err) => {
  if (err) {
    console.log("error while running the query in user.model :", error);
  }
});
// database.close();
