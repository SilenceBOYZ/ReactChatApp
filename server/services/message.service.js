const Conversation = require("../models/conversation.model")
const Message = require("../models/message.model")

let getMessages = (userToChatId, senderId) => {
  return new Promise(async (res, rej) => {
    try {
      const conversation = await Conversation.findOne({
        participants: {
          $all: [senderId, userToChatId]
        }
      }).populate({
        path: "messages",
        strictPopulate: false
      });
      
      if (!conversation) res([]);

      res(conversation.messages);
    } catch (error) {
      rej(error)
      console.error("Error from messages services ", error.message);
    }
  })
}

let sendMessage = (senderId, receiverId, messageContent) => {
  return new Promise(async (res, rej) => {
    try {
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
      // SOCKET IO FUNCTIONALITY
      // await conversation.save();
      // await newMessage.save();
      // Take the time longer so use Promise.all is perfect
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
      await Promise.all([conversation.save(), newMessage.save()])
      res(newMessage);
    } catch (error) {
      rej(error);
    }
  })
}


module.exports = {
  getMessages,
  sendMessage
}