class Util {
  createInitialPhase = () => {
    let obj = {};
    for (let i = 0; i < 7; i++) {
      obj[i] = {};
      for (let j = 5; j >= 0; j--) {
        obj[i][j] = "E";
      }
    }
    return obj;
  };
  fillTable = (col, data, chance) => {
    let _data = JSON.parse(JSON.stringify(data));
    if (_data[col]) {
      let obj = Object.keys(_data[col]);
      let len = obj.length;
      let row = 0;
      for (let i = 0; i < len; i++) {
        if (_data[col][i] === "E") {
          _data[col][i] = chance ===  "Yellow" ? "Yellow" : "Red";
          row = i;
          break;
        }
      }
      let winner = this.checkWinner(_data, chance, row, col);
      return winner;
    } else {
      return {
        status: false,
        win: false,
        message: "invalid move",
        data: data,
      };
    }
  };
  checkWinner = (data, chance, row, col) => {
    let _data = JSON.parse(JSON.stringify(data));
    return {
      status: true,
      win: this.check(_data, col, row, chance),
      message: `Move succesfully captured,Now ${
        chance === "Yellow" ? "Red's" : "Yellow's"
      } chance`,
      data: data,
    };
  };
  check(obj, col, row, chance) {
    let d = obj[col];
    if (this.checkVerticle(d, chance)) {
      //   console.log("hor")
      return true;
    } else if (this.checkHorizontal(obj, row, chance)) {
      //   console.log("vir")
      return true;
    } else {
      //   console.log("dig")
      return this.checkDiagonal(obj, col, row, chance);
    }
    return false;
  }
  checkVerticle(d, chance) {
    let data = Object.keys(d);
    let count = 0;
    let len = data.length;
    for (let i = 0; i < len; i++) {
      if (count >= 4) {
        return true;
      }
      if (d[data[i]] === chance) {
        //  console.log(d[data[i]],"d",count)
        count = count + 1;
      } else {
        count = 0;
      }
    }
    return count >= 4;
  }
  checkHorizontal(d, row, chance) {
    let copyd = JSON.parse(JSON.stringify(d));
    let data = Object.keys(copyd);
    let count = 0;
    let len = data.length;
    for (let i = 0; i < len; i++) {
      if (count >= 4) {
        return true;
      }
      if (copyd[data[i]][row] === chance) {
        // console.log(data,d,count)
        count++;
      } else {
        count = 0;
      }
    }
    return count >= 4;
  }
  checkDiagonal(d, col, row, chance) {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    for (let i = 0; i < 8; i++) {
      // console.log(col-1,col+1)

      if (d[col - i] && d[col - i][row - i] === chance) {
        count1++;
      } else {
        if (d[col - i]) {
          count1 = 0;
        }
      }
      if (d[col + i] && d[col + i][row + i] === chance) {
        count2++;
      } else {
        if (d[col + i]) {
          count2 = 0;
        }
      }
      if (d[col - i] && d[col - i][row + i] === chance) {
        count3++;
      } else {
        if (d[col - i]) {
          count3 = 0;
        }
      }
      if (d[col + i] && d[col + i][row - i] === chance) {
        count4++;
      } else {
        if (d[col + i]) {
          count4 = 0;
        }
      }
    }
    console.log(count1, count2, count3, count4);
    return count1 >= 4 || count2 >= 4 || count3 >= 4 || count4 >= 4;
  }
}
module.exports = Util;
