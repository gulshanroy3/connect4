
const Util = require("./util");
class RouteHandler {
  async homePage(req,res){
    return res.send(
      `
      .welcome to connect 4 game<br>.
      To install this app in local ,clone it from here https://github.com/gulshanroy3/connect4<br>.
      command-> npm i and npm run start-dev<br>.
      to start use  /start-game<br>.
      to stop use /stop-game<br>.
      to make move use /make-move?col={column-name}<br><br>

      Thanks
        `
    )
  }



  async startGame(req, res) {
    let util = new Util();
    if (req.session.intialGameSetup) {
      return res.send(
        "Game is running,If you want to stop this game please use /stop-game ,Thanks"
      );
    }
    req.session.intialGameSetup = util.createInitialPhase();
    req.session.chance = "Yellow";
    var hour = 3600000;
    req.session.expires = new Date(Date.now() + hour);
    return res.send(
      "Game started, please send column number in /make-move?col={column name}"
    );
  }

  async stopGame(req, res) {
    if (req.session.intialGameSetup) {
      req.session.destroy();
      return res.send("Game has Stopped ,use /start-game to start fresh game");
    }
    return res.send(
      "no game is running,please use /start-game to Start the new game"
    );
  }

  async makeMove(req, res) {
    if (req.session.intialGameSetup) {
      try {
        let util = new Util();
        var intialGameSetup = req.session.intialGameSetup;
        var chance = req.session.chance;
        var col = req.query.col-1;
        let newData = util.fillTable(col, intialGameSetup, chance);
        console.log(col, chance, newData);
        req.session.intialGameSetup = newData.data;
        req.session.chance = chance == "Yellow" ? "Red" : "Yellow";
        if(newData.status){
          if(newData.win){
            req.session.destroy();
            return res.send(`${chance} is winner,start again using /start-game`)
          }
          else{
            return res.send(newData.message)
          }
        }
        return res.send("Invalid Move");
      } catch (err) {
        console.log(err);
        return res.send("Request Failed");
      }
    }
    return res.send(
      "no game is running,please use /start-game to Start the new game"
    );
  }
}
module.exports = RouteHandler;
