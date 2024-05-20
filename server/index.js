const express = require('express');
const app = express();
module.exports = { app }
const bodyParser = require('body-parser')
const routes = require("./routes")
// const { join } = require('node:path');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const connectToMongoDB = require('./config/connectToMongoDB');
const { server } = require("./socket/socket.js");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log("Listening on port ", PORT);
})