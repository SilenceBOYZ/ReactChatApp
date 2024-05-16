const dotenv = require("dotenv");

let connectToDotEnv = () => {
  return dotenv.config();
}

module.exports = { connectToDotEnv }