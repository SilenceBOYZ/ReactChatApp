const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller")

router.get("/logout", AuthController.logout)
router.post("/signup", AuthController.signup)

router.get("/login",  AuthController.loginUser)

module.exports = router;