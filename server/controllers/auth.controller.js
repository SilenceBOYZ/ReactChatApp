const AuthService = require("../services/auth.service")
const { generateToken } = require("../utils/generateToken")

let loginUser = async (req, res) => {
  const data = req.body;
  const user = await AuthService.authLogin(data);
  if (user.errCode === 0) {
    let { data: userData } = user;
    let token = generateToken(userData._id);
    await res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    })
  }
  res.status(200).json(user);
}

let logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({
    errCode: 0,
    errMessage: "Logout Successfully"
  });
}

let signup = async (req, res) => {
  const data = req.body;
  const user = await AuthService.authSignup(data);
  if (user.errCode === 0) {
    const userToken = generateToken(user.data._id);
    res.cookie("jwt", userToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    })
  }
  res.status(200).json(user);
}

module.exports = {
  loginUser,
  logout,
  signup
}