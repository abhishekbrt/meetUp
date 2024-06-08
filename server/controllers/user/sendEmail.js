const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async (email, verificationCode) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Use 465 for SSL
    secure: false, // Use true for SSL
    auth: {
      user: "ababhishek7398@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: "ababhishek7398@gmail.com",
      to: email,
      subject: "Email verification for Meetup",
      text: `Your Verification Code is ${verificationCode}`,
    });
    // console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log("error while sending email, Error: ", err);
  }
};

module.exports = sendEmail;
