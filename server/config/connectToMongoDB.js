const mongoose = require("mongoose");
require("dotenv").config();


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("connect to mongo DB");
  } catch (error) {
    console.log("Error connecting to MongoDB ", error.message);
  }
}

module.exports = connectToMongoDB;