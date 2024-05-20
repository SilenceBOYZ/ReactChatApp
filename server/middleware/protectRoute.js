const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/user.model');

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" })
    }

    const userCheck = await User.findById(decoded.userId).select("-password");

    if (!userCheck) return res.status(404).json({ error: "User not found" })

    // Assign user request
    req.user = userCheck;
    next();

  } catch (error) {
    console.log("Error in protect middleware ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  protectRoute
}