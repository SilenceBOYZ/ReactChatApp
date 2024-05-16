const MessageServices = require("../services/message.service");
const Conversation = require("../models/conversation.model")
const Message = require("../models/message.model")

let sendMessage = async (req, res) => {
  try {
    let messageContent = req.body.message;
    let receiverId = req.params.id;
    let senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId]
      },
    })
    if (!conversation) {
      // Check whether if the users chated together in the first time
      // if this variable was null so we will create the room and add the user in
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message: messageContent,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message)
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  sendMessage,
}