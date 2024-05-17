const UserServices = require("../services/users.service")

let getUserInfor = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await UserServices.filterUserInfor(loggedInUserId);
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSidebar: ", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}


module.exports = {
  getUserInfor,
}