const routeHandler = require("../handler/RouterHandler");
const path = require("path");

class route {
  constructor(app) {
    this.app = app;
  }
  appRoutes() {
    let route = new routeHandler();
    this.app.get("/start-game", route.startGame);
    this.app.get("/stop-game", route.stopGame);
    this.app.get("/make-move", route.makeMove);
    this.app.get("/",route.homePage)
  }

  routeConfig() {
    this.appRoutes();
  }
}
module.exports = route;
