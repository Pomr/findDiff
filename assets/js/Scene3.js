var jiaoben = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {
        prefab_guanqia: cc.Prefab,
    },

    onLoad() {   //逻辑层 恢复时间、显示在屏幕上的倒计时
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        var node_power = this.node.getChildByName("top").getChildByName("kuang").getChildByName("pow");
        node_power.getComponent(cc.Label).string = jiaoben.daojishi.showpower();
        this.schedule(function () {    //倒计时
            var myDate = new Date();
            if (jiaoben.daojishi.showpower() < 8) {
                if (jiaoben.daojishi.kaiguan == true) {
                    this.node.getChildByName("top").getChildByName("kuang").getChildByName("daojishi").active = true;
                    jiaoben.daojishi.change();
                    jiaoben.daojishi.kaiguan = false;
                }
                else {
                    var a = Math.abs(Math.floor((myDate.getTime() - jiaoben.daojishi.showchangetime()) / jiaoben.daojishi.showall() + 1));
                    var b = Math.abs((myDate.getTime() - jiaoben.daojishi.showchangetime()) % jiaoben.daojishi.showall());    //round四舍五入 不然数字容易跳
                    if (myDate.getTime() >= jiaoben.daojishi.showchangetime()) {   //当前时间大于恢复时间   恢复体力
                        if (jiaoben.daojishi.showpower() + a >= 8) {
                            jiaoben.daojishi.setpower();
                            var node_power = this.node.getChildByName("top").getChildByName("kuang").getChildByName("pow");
                            node_power.getComponent(cc.Label).string = 8;
                            jiaoben.daojishi.kaiguan = true;
                        }
                        else {   //修改  将要恢复体力退出当前界面后再进来的倒计时时间不对
                            jiaoben.daojishi.addpower(a);
                            jiaoben.daojishi.settime();
                            jiaoben.daojishi.settimedownt(b);
                            jiaoben.daojishi.changet();
                        }
                    }
                    else {    //时间未到  倒计时--并显示    时间显示不正确
                        jiaoben.daojishi.settimen(Math.round(b / 1000) * 1000);
                        console.log(jiaoben.daojishi.showtime())
                        this.node.getChildByName("top").getChildByName("kuang").getChildByName("daojishi").active = true;
                        var label_daojishi = this.node.getChildByName("top").getChildByName("kuang").getChildByName("daojishi").getComponent(cc.Label);
                        var i = jiaoben.daojishi.showtime() % 60000 / 1000;
                        var j = (jiaoben.daojishi.showtime() - i * 1000) / 60000;
                        if (i < 10) {
                            if (j < 10) {
                                label_daojishi.string = "0" + j + ":0" + i;
                            }
                            else {
                                label_daojishi.string = j + ":0" + i;
                            }
                        }
                        else {
                            if (j < 10) {
                                label_daojishi.string = "0" + j + ":" + i;
                            }
                            else {
                                label_daojishi.string = j + ":" + i;
                            }
                        }
                    }
                }
            }
            else {
                this.node.getChildByName("top").getChildByName("kuang").getChildByName("daojishi").active = false;
            }
        }.bind(this), 1);
        var addheight = true;
        var num = 100;
        for (var i = 1; i <= num; i++) {
            var a = cc.instantiate(this.prefab_guanqia);
            this.node.getChildByName("ScrollView").getChildByName("view").getChildByName("content").addChild(a);
            a.getChildByName("label").getComponent(cc.Label).string=i;
            if(i<=jiaoben.daojishi.showunlock()){
                a.getChildByName("lock").active=false;
            }
            a.getComponent("guanqia").tag2 = i;
            if (addheight == true) {    //guanqia 120 间隔50  ceil向上取整
                this.node.getChildByName("ScrollView").getChildByName("view").getChildByName("content").height =
                    a.height * (Math.ceil(num / 3) + 1) + 40 * Math.floor(num / 3);
            }
        }
    },

    click_return: function() {
        cc.director.loadScene("12");
    },

    click_back: function () {
        this.node.getChildByName("powernull").active = false;
    },

    start() {
    },

    update() {
        var node_power = this.node.getChildByName("top").getChildByName("kuang").getChildByName("pow");
        node_power.getComponent(cc.Label).string = jiaoben.daojishi.showpower();
    },
});