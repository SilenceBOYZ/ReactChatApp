const AuthRoute = require("./auth.routes")
const MessageRoute = require("./message.route")
const ConversationRoute = require("./conversation.route")
const UserRoute = require("./user.route")

const routes = (app) => {
  app.use("/api/auth", AuthRoute)
  app.use("/api/message", MessageRoute)
  app.use("/api/users", UserRoute)
  app.use("/api/conversation", ConversationRoute)
}

module.exports = routes;
