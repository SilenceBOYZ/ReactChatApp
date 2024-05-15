const express = require('express');
const app = express();
const routes = require("./routes")
const { join } = require('node:path');
const connectToMongoDB = require('./config/connectToMongoDB');
require("dotenv").config();
const PORT = process.env.PORT || 4000;

routes(app);


app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Listening on port ", PORT);
})