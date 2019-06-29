var win = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    click_return: function () {
        cc.director.loadScene("3");
    },

    click_next: function () {
        cc.director.loadScene("game");
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        var i = (win.play.showtime() - win.play.shownew_time()) % 60;
        var j = (win.play.showtime() - win.play.shownew_time() - i) / 60;
        this.node.getChildByName("msg").getChildByName("num").getComponent(cc.Label).string = j + "分" + i + "秒";
    },

    start() {

    },

    // update (dt) {},
});
