const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller")
const { protectRoute } = require("../middleware/protectRoute")

router.get("/", protectRoute, UserController.getUserInfor)

module.exports = router;
