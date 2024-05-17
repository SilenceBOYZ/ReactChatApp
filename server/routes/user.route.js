const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller")
const { protectRoute } = require("../middleware/protectRoute")

router.get("/", protectRoute, UserController.getUserInfor)

module.exports = router;
