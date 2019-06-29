var zhadan = require("lj1");
var Zhadan = function () {
    module = this;
    var num = Math.floor(Math.random() * 3);;                 //炸弹所在位置
    var tag;                 //用户所在位置
    var player = [0, 1, 2]
    module.diff = [1, 2, 3, 4, 5];             //不同处数组
    module.true = 0;   //个人正确找茬个数 显示在面板上
    var all = 5;  //当前图片不同处
    module.now = 0;   //当前已找到不同之处
    var time = 80;
    module.settime = function () {
        time = 25;
    }
    module.reducetime = function () {
        time--;
    }
    module.showtime = function () {
        return time;
    }
    module.shownum = function () {
        return num;
    }
    module.changenum = function (n) { //开始游戏，炸弹换位
        if (diff.indexOf(n) + 1 == 3) {
            num = 0;
        }
        else {
            num = diff.indexOf(n) + 1
        }

    }
    module.showtag = function () {
        return tag;
    }
    module.settag = function () {    //测试
        tag = 1;
    }
    module.showdiff = function () {
        return diff;
    }
    module.startdiff = function () {
        for (var i = 1; i <= all; i++) {
            diff.push(i);
        }
    }
    module.delediff = function (n) {
        diff.splice(diff.indexOf(n), 1);
    }
    module.showall = function () {
        return all;
    }
}
zhadan.pong = new Zhadan();

/*一进去的炸弹选中的人 123随机  
例 当前为2,从场景从返回一个true时，2+1=3
为3时 3->1

*/