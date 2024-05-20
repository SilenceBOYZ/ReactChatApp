const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/Bcrypt")

let authSignup = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {}
      const { fullName, username, password, confirmPassword, gender } = userData;
      if (password !== confirmPassword) {
        data.errCode = 1;
        data.errMessage = "Password doesn't match";
        resolve(data)
      } else {
        const checkExist = await User.findOne({ username })
        if (checkExist) {
          data.errCode = 2;
          data.errMessage = "User name have already existed";
        } else {
          // default picture
          const sex = gender === "male" ? "boy" : gender === "female" ? "girld" : "boy";
          const ProfilePic = `https://avatar.iran.liara.run/public/${sex}?username=${username}`;
          const newUser = new User({
            fullName,
            username,
            password: await hashPassword(password),
            gender,
            profilePic: ProfilePic
          })
          const user = await newUser.save();
          data.errCode = 0;
          data.errMessage = "Create user successfully";
          data.data = user;
        }
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

let authLogin = ({ username, password }) => {
  return new Promise(async (res, rej) => {
    try {
      const data = {};
      const user = await User.findOne({ username });
      if (!user) {
        data.errCode = 1
        data.errMessage = "The user doesn't exists";
      } else {
        const isPasswordCorrect = comparePassword(password, user.password);
        if (!isPasswordCorrect) {
          data.errCode = 2;
          data.errMessage = "The password doesn't match";
        } else {
          data.errCode = 0;
          data.errMessage = "Login Successfully";
          data.data = user;
        }
      }
      res(data);
    } catch (error) {
      rej(error);
    }
  })
}

module.exports = {
  authSignup,
  authLogin
}