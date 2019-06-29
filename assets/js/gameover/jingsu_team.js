cc.Class({
    extends: cc.Component,

    properties: {
        prefab_mvp: cc.Prefab,
        prefab_player: cc.Prefab,
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        var a1 = cc.instantiate(this.prefab_mvp);
        this.node.getChildByName("self").addChild(a1);
        var b1 = cc.instantiate(this.prefab_player);
        this.node.getChildByName("self").addChild(b1);
        var c1 = cc.instantiate(this.prefab_player);
        this.node.getChildByName("self").addChild(c1);
        var a2 = cc.instantiate(this.prefab_mvp);
        this.node.getChildByName("other").addChild(a2);
        var b2 = cc.instantiate(this.prefab_player);
        this.node.getChildByName("other").addChild(b2);
        var c2 = cc.instantiate(this.prefab_player);
        this.node.getChildByName("other").addChild(c2);
    },

    click_return:function(){
        cc.director.loadScene("main");
    },

    start() {

    },

    // update (dt) {},
});
