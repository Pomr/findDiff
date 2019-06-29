var jiaoben = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    click_on: function () {
        if (jiaoben.daojishi.showpower() > 0) {
            jiaoben.daojishi.setpowerdown();
            cc.director.loadScene("game");
            jiaoben.daojishi.tag=this.tag;     //event.target.tag 不存在此属性
        }
        else {
            this.node.getChildByName("powernull").active = true;
        }
    },

    onLoad () {
        this.tag;
    },

    start () {

    },

    // update (dt) {},
});
