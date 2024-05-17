const User = require("../models/user.model");

let getUserInfor = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Get All user in chat room except userLoggin
    // Lấy tất cả người dùng trong room chat 
    // $ne = notequal
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSidebar: ", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}


module.exports = {
  getUserInfor,
}