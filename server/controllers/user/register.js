const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const isUserExist = require("../helper/isUserExist");
const User = require("../../models/user.model");
const sendEmail = require("./sendEmail");
const db = require("../../config/database");
const {promisify}=require('util');
const dbRun=promisify(db.run.bind(db));
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    console.log(req.body);
    // const authHeader = req.headers;
    // console.log(authHeader);

    if (password !== confirmPassword) {
      console.log("password did not match");
      return res.status(401).json({ message: "password didn't match" });
    }

    const checkUserExists = await isUserExist(email);
    // console.log(checkUserExists);
    if (checkUserExists) {
      console.log("user is already exists");
      return res.status(401).json({ message: "user already exist, try Login !!" });
    }

    const emailSchema = z
      .string()
      .email()
      .refine(
        (email) => email.endsWith(".ac.in") || email.endsWith("gmail.com"),
        {
          message: "You must sign up with your college email",
        }
      );

    const passwordSchema = z.string().min(8);

    const emailValidationResult = emailSchema.safeParse(email);
    const passwordValidationResult = passwordSchema.safeParse(password);

    if (!emailValidationResult.success) {
      if (
        emailValidationResult.error.issues &&
        emailValidationResult.error.issues.length > 0
      ) {
        return res.status(403).json({
          message: emailValidationResult.error.issues[0].message,
        });
      } else {
        return res.status(403).json({
          message: "Invalid email!",
        });
      }
    }

    if (!passwordValidationResult.success) {
      return res.status(403).json({
        message: "Password must be minimum 8 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    const tableName = "logindata";
    const query = `INSERT INTO ${tableName} (email,password,verificationCode) VALUES (?,?,?)`;

    const result = await dbRun(query, [
      emailValidationResult.data,
      hashedPassword,
      verificationCode,
    ]);

    // const token = jwt.sign(
    //   { email: emailValidationResult.data },
    //   process.env.JWT_SECRET
    // );
    sendEmail(emailValidationResult.data, verificationCode);

    res.status(201).json({
      // token:token,
      message: "account created!",
    });
  } catch (err) {
    console.log("error while creating account :", err);
  }
};

module.exports = register;
