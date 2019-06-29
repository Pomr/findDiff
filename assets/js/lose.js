var lose = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    click_back: function () {
        cc.director.loadScene("main");
    },

    click_again: function () {
        cc.director.loadScene("game");
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        this.node.getChildByName("jiesuan").getChildByName("num").getComponent(cc.Label).string = lose.play.shownow();
    },

    start() {

    },

    // update (dt) {},
});
