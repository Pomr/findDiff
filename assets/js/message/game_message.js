var game = require("lj1");
var Game = function () {
    module = this;
    var time = 150;   //总时间
    var new_time;
    var new_all = 3;  //当前图片不同处
    var all = 12;  //总不同处
    var now;
    var tishi=5;
    module.showtime = function () {
        return time;
    }
    module.shownew_time = function () {
        return new_time;
    }
    module.setnew_time = function () {
        new_time = time + 5;
    }
    module.reducenew_time = function () {
        new_time--;
    }
    module.addnew_time = function (n) {
        new_time += n;
    }
    module.shownow_all = function () {
        return new_all;
    }
    module.showall = function () {
        return all;
    }
    module.setnow = function () {
        now = 0;
    }
    module.shownow = function () {
        return now;
    }
    module.addnow = function () {
        now++;
    }
    module.addtishi=function(){
        tishi++;
    }
    module.showtishi=function(){
        return tishi;
    }
    module.reducetishi=function(){
        tishi--;
    }
}
game.play = new Game();