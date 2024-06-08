const db = require("./db.js");
const { promisify } = require("util");
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));


const tableName = "logindata";

// function to check user is present in table or not with email
async function checkUser(email) {
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

// function to implement registration
async function register(email, password) {
  const isAlreadyRegistered = await checkUser(email);

  if (isAlreadyRegistered) {
    return "User is already registered";
  } else {
    const query = `INSERT INTO ${tableName} (email,password) VALUES (?,?)`;
    try {
      await dbRun(query, [email, password]);
      return `user is registered succesfully with email: ${email} and password: ${password}`;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}

// function to implement login
async function login(email, password) {
  const isAlreadyLogin = await checkUser(email);

  if (isAlreadyLogin) {
    let query = `SELECT password FROM ${tableName} WHERE email=?`;
    try {
      const row = await dbGet(query, [email]);

      if (row.password === password) {
        return "user login successfully";
      } else {
        return "password is incorect";
      }
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  } else {
    return "User is not registerd, please register";
  }
}

const authUser = {
  register,
  login,
};

module.exports = authUser;
