var bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const session = require("express-session");

class appConfig {
  constructor(app) {
    this.app = app;
  }

  appConnection() {
    this.app.use(
      session({
        secret: "key",
        resave: true,
        saveUninitialized: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(cookieParser());
  }
}
module.exports = appConfig;
