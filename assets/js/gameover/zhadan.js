cc.Class({
    extends: cc.Component,

    properties: {
        prefab_3: cc.Prefab,
        pno1:cc.SpriteFrame,
        pno2:cc.SpriteFrame,
        pno3:cc.SpriteFrame,
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        var layout=this.node.getChildByName("node").getChildByName("Layout");
        var no1=cc.instantiate(this.prefab_3);
        layout.addChild(no1);
        no1.getChildByName("no").getComponent(cc.Sprite).spriteFrame=this.pno1;
        var no2=cc.instantiate(this.prefab_3);
        layout.addChild(no2);
        no2.getChildByName("no").getComponent(cc.Sprite).spriteFrame=this.pno2;
        var no3=cc.instantiate(this.prefab_3);
        layout.addChild(no3);
        no3.getChildByName("no").getComponent(cc.Sprite).spriteFrame=this.pno3;
    },

    start() {
    },
    // update (dt) {},


});
