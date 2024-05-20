const AuthRoute = require("./auth.routes")
const MessageRoute = require("./message.route")
const ConversationRoute = require("./conversation.route")
const UserRoute = require("./users.route")

const routes = (app) => {
  app.use("/api/auth", AuthRoute)
  app.use("/api/message", MessageRoute)
  app.use("/api/users", UserRoute)
  app.use("/api/conversation", ConversationRoute)
  app.use("/", (req, res) => {
    res.send("Hello")
  })
}

module.exports = routes;
