const express = require("express");
const router = express.Router();
const ConversationController = require("../controllers/conversation.controller")

router.get("/", ConversationController.test)

module.exports = router;