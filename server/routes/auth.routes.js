const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller")

router.post("/logout", AuthController.logout)
router.post("/signup", AuthController.signup)
router.post("/login",  AuthController.loginUser)

module.exports = router;