const MessageServices = require("../services/message.service");

let sendMessage = async (req, res) => {
  try {
    let messageContent = req.body.message;
    let receiverId = req.params.id;
    let senderId = req.user._id;
    let newMessage = await MessageServices.sendMessage(senderId, receiverId, messageContent);
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
    const messageFromConversation = await MessageServices.getMessages(userToChatId, senderId);
    res.status(200).json(messageFromConversation);
  } catch (error) {
    console.log("Error in getMessages controller ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  sendMessage,
  getMessage
}