const User = require("../models/user.model");

let filterUserInfor = (userCurrentlyLogin) => {
  return new Promise(async (res, rej) => {
    try {
      // Get All user in chat room except userLoggin
      // Lấy tất cả người dùng trong room chat 
      // $ne = not equal "Loại user đang đăng nhập"
      // select: lấy các field - khi đặt dấu "-" trước field thì sẽ không lấy trường dữ liệu đó
      let allUserFiltered = await User.find({ _id: { $ne: userCurrentlyLogin } }).select("-password");
      res(allUserFiltered);
    } catch (error) {
      rej(error)
    }
  })
}


module.exports = {
  filterUserInfor
}