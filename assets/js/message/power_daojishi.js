var power = require("lj1");
var Power = function () {
    module = this;
    var power = 8;
    var all = 180000;    //以毫秒为单位  1秒=1000毫秒
    var nextPowerTime = all;   
    var changeTime = 0;
    var unlock=6;
    module.tag1;
    module.tag2;
    module.kaiguan = true;
    module.change = function () {//利用当前时间+恢复体力的间隔时间 算出恢复体力的最终时间 
        var myDate = new Date();
        changeTime = myDate.getTime() + all;
    }
    module.changet=function(){
        var myDate = new Date();
        changeTime = myDate.getTime() + nextPowerTime;
    }
    module.showchangetime = function () {
        return changeTime;
    }
    module.setchangetimedown=function(a){
        changeTime-=a
    }
    module.setpower = function () {
        power = 8;
    }
    module.addpower = function (p) {
        power += p;
    }
    module.setpowerdown = function () {
        power--;
    };
    module.showpower = function () {
        return power;
    };
    module.showtime = function () {
        return nextPowerTime;
    };
    module.settimedownt = function (t) {
        nextPowerTime -= t;
    }
    module.settimen = function (n) {
        nextPowerTime = n;
    }
    module.settime = function () {
        nextPowerTime = all;
    }
    module.showall = function () {
        return all;
    }
    module.showunlock=function(){
        return unlock;
    }
    module.addunlock=function(){
        unlock++;
    }
};
power.daojishi = new Power();  