var main = require("lj1");
var Main = function () {
    module=this;  //**** 
    var friend = 10;
    var touxiang=cc.SpriteFrame;
    var name;
    var jiangbei;
    var chenghao;

    module.showfriend = function () {
        return friend;
    }
    module.settouxiang=function(to){
        to=touxiang;
    }
    module.setname=function(na){
        na=name;
    }
    module.setjiangbei=function(ji){
        ji=jiangbei;
    }
    module.setchenghao=function(ch){
        ch=chenghao;
    }
};
main.top = new Main();
/*排名 no                            1-3        sprite **
                                         4-n        lable **
      个人信息 self         touxiang     sprite
                            name         label
      奖杯 jiangbei                      label               
      称号 chenghao          label        label
      var
      好友数量 < -- > no
    */