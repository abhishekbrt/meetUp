const express = require("express");
const router = express.Router();
const login = require("../controllers/user/login");
const register = require("../controllers/user/register");
const verifyUser = require("../controllers/user/verifyUser");

router.post("/api/register", register);
router.post("/api/verify", verifyUser);

router.post("/api/login", login);

module.exports = router;
