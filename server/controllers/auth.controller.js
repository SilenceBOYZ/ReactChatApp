

let loginUser = (req, res) => {
  res.send("welcome to page login");
}

let logout = (req, res) => {
  res.send("Logout");
}

let signup = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body
  
}

module.exports = {
  loginUser,
  logout,
  signup
}