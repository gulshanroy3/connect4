const express = require("express");
const appConfig = require("./config/appConfig");
const routes = require("./web/route");
require("dotenv").config();
class Server {
  constructor() {
    this.app = express();
  }
  connect() {
    let PORT = process.env.PORT;
    console.log(process.env.COLLECTION);
    this.app.use(express.static(__dirname + "./web/build/static"));
    new appConfig(this.app).appConnection();
    this.app.listen(PORT, function () {
      console.log(`listening at ${PORT}`);
    });
    new routes(this.app).routeConfig();
  }
}
const app = new Server();
app.connect();
