const express=require('express');
const router=express.Router();
const {verifyToken}=require('../auth/auth-middleware');
const isUserOnline=require('../controllers/user/isUserOnline');


router.post('/api/connect',verifyToken,isUserOnline);



module.exports=router;