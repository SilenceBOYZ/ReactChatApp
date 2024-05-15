const AuthRoute = require("./auth.routes")

const routes = (app) => {
  app.use("/auth", AuthRoute)
}

module.exports = routes;
