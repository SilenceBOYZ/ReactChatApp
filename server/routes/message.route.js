const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message.controller")
const { protectRoute } = require("../middleware/protectRoute")

router.post("/send/:id", protectRoute, MessageController.sendMessage)

module.exports = router;