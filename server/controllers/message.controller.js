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

    // SOCKET IO FUNCTIONALITY

    // await conversation.save();
    // await newMessage.save();
    // Take the time longer so use Promise.all is perfect

    await Promise.all([conversation.save(), newMessage.save()])

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message)
    res.status(500).json({ error: "Internal server error" });
  }
}

let getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId]
      }
    }).populate({
      path: "messages",
      strictPopulate: false
    });

    res.status(200).json(conversation.messages)

  } catch (error) {
    console.log("Error in getMessages controller ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  sendMessage,
  getMessage
}