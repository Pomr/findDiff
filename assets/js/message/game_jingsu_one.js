var one = require("lj1");
var One = function () {
    module = this;
    var now = 0;    //当前找茬个数
    var all = 20;  //总个数
    var new_now = 0;    //每张图片的当前找茬个数
    var new_all = 5;    //每张图片的找茬个数
    var pnum = -1;
    var diff = [];
    var time = 10;   //当前图片时间
    var reducetime;
    module.startdiff = function () {
        for (var i = 1; i <= new_all; i++) {
            diff.push(i);
        }
    }
    module.showdiff = function () {
        return diff;
    }
    module.reducediff = function (n) {
        diff.splice(diff.indexOf(n), 1);
    }
    module.showall = function () {
        return all;
    }
    module.showtime = function () {
        return time;
    }
    module.setreducetime = function () {
        reducetime = time;
    }
    module.reducetimen = function (n) {
        time -= n;
    }
    module.reducetime = function () {
        reducetime--;
    }
    module.shownow = function () {
        return now;
    }
    module.addnow = function () {
        now++;
    }
    module.shownew_now = function () {
        return new_now;
    }
    module.addnew_now = function () {
        new_now++;
    }
    module.setnew_now = function () {
        new_now = 0;
    }
    module.showtag = function () {
        return tag;
    }
    module.shownew_all = function () {
        return new_all;
    }
    module.showreducetime = function () {
        return reducetime;
    }
    module.showpnum = function () {
        return pnum;
    }
    module.addpnum = function () {
        pnum++;
    }
}
one.personal = new One();