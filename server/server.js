const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const fs =require('fs');
const https=require('https');
const path=require('path');
const authRouter=require('./auth/authentication.js');
const userRouter=require('./routes/userRouter.js')

const options={
  key:fs.readFileSync('/home/abhishek/react/certificates/meetUP-backend/key.pem'),
  cert:fs.readFileSync('/home/abhishek/react/certificates/meetUP-backend/cert.pem')
};

const server=https.createServer(options,app);


require("dotenv").config();

const db=require('./config/database.js')
// const router = require("./routes/router.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use('/',authRouter);
app.use('/',userRouter)



server.listen(process.env.PORT || 3033, () => {
  console.log(`Server is running on port ${process.env.PORT || 3033}`);
});


io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});
