const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  })
  return token;
}

const setCookie = (userToken, res) => {
  try {
    if (userToken.length > 0) {
      res.cookie("jwt", userToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
      })
    } else throw new Error("userToken is empty");
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = { generateToken, setCookie }