const AuthService = require("../services/auth.service")
const { generateToken, setCookie } = require("../utils/generateToken")

let loginUser = async (req, res) => {
  const data = req.body;
  const user = await AuthService.authLogin(data);
  if (user.errCode === 0) {
    let { data: userData } = user;
    let token = generateToken(userData._id);
    setCookie(token, res);
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
  const userToken = generateToken(user.data._id);
  setCookie(userToken, res)
  res.status(200).json(user);
}

module.exports = {
  loginUser,
  logout,
  signup
}