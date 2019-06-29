cc.Class({
    extends: cc.Component,

    properties: {
       p_choose1:cc.SpriteFrame,
       p_choose2:cc.SpriteFrame,
       p_choose3:cc.SpriteFrame,
       p_choose4:cc.SpriteFrame,
       l_choose1:cc.SpriteFrame,
       l_choose2:cc.SpriteFrame,
       l_choose3:cc.SpriteFrame,
       l_choose4:cc.SpriteFrame,
    },

    click_return:function(){
        cc.director.loadScene("main");
    },
    
    click_start:function(){              //不同选项不同开始界面  不同button 不同tag值，去往不同开始界面
        if(this.tag==1){
            cc.director.loadScene("gamezhadan")
        }
        else if(this.tag==2){
            cc.director.loadScene("gamejingsu_one")
        }
        else if(this.tag==3){
            cc.director.loadScene("gamejingsu_team")
        }
    },

    click_auto:function(event){
        event.target.getChildByName("btn_gou").active=!event.target.getChildByName("btn_gou").active;
    },

    click_list:function(event){
        this.node.getChildByName("up").active=!this.node.getChildByName("up").active;
        event.target.getChildByName("btn_xia").active=!event.target.getChildByName("btn_xia").active;
        event.target.getChildByName("btn_shang").active=!event.target.getChildByName("btn_shang").active;
    },

    click_touming:function(event){
        event.target.parent.active=false;
    },

    click_really:function(){
        this.node.getChildByName("really").active=!this.node.getChildByName("really").active;
    },

    choosekuang:function(){
        var node_list=this.node.getChildByName("up").getChildByName("list");
        for(var i=0;i<node_list.childrenCount;i++){
            node_list.children[i].getChildByName("btn_xuanze").active=false;
        }
    },

    choose14:function(){
        var node_choose=this.node.getChildByName("choose");
        for(var i=1;i<node_choose.childrenCount;i++){
            node_choose.children[i].active=false;
        }
    },

    click_1:function(event){
        this.node.getChildByName("choose").getChildByName("picture").getComponent(cc.Sprite).spriteFrame=this.p_choose1;
        this.node.getChildByName("biaoti").getChildByName("biaoti").getComponent(cc.Sprite).spriteFrame=this.l_choose1;
        this.node.getChildByName("up").active=false;
        this.choose14();
        this.node.getChildByName("choose").getChildByName("choose1").active=true;
        this.node.getChildByName("down").getChildByName("btn_start").active=false;
        this.choosekuang();
        event.target.getChildByName("btn_xuanze").active=true;
        this.node.getChildByName("biaoti").getChildByName("btn_xia").active=false;
        this.node.getChildByName("biaoti").getChildByName("btn_shang").active=true;
    },

    click_2:function(event){
        this.node.getChildByName("choose").getChildByName("picture").getComponent(cc.Sprite).spriteFrame=this.p_choose2;
        this.node.getChildByName("biaoti").getChildByName("biaoti").getComponent(cc.Sprite).spriteFrame=this.l_choose2;
        this.node.getChildByName("up").active=false;
        this.choose14();
        this.node.getChildByName("choose").getChildByName("choose2").active=true;
        this.node.getChildByName("down").getChildByName("btn_start").active=true;
        this.choosekuang();
        event.target.getChildByName("btn_xuanze").active=true;
        this.node.getChildByName("biaoti").getChildByName("btn_xia").active=false;
        this.node.getChildByName("biaoti").getChildByName("btn_shang").active=true;
        this.tag=1;
    },

    click_3:function(event){
        this.node.getChildByName("choose").getChildByName("picture").getComponent(cc.Sprite).spriteFrame=this.p_choose3;
        this.node.getChildByName("biaoti").getChildByName("biaoti").getComponent(cc.Sprite).spriteFrame=this.l_choose3;
        this.node.getChildByName("up").active=false;
        this.choose14();
        this.node.getChildByName("choose").getChildByName("choose3").active=true;
        this.node.getChildByName("down").getChildByName("btn_start").active=true;
        this.choosekuang();
        event.target.getChildByName("btn_xuanze").active=true;
        this.node.getChildByName("biaoti").getChildByName("btn_xia").active=false;
        this.node.getChildByName("biaoti").getChildByName("btn_shang").active=true;
        this.tag=2;
    },

    click_4:function(event){
        this.node.getChildByName("choose").getChildByName("picture").getComponent(cc.Sprite).spriteFrame=this.p_choose4;
        this.node.getChildByName("biaoti").getChildByName("biaoti").getComponent(cc.Sprite).spriteFrame=this.l_choose4;
        this.node.getChildByName("up").active=false;
        this.choose14();
        this.node.getChildByName("choose").getChildByName("choose4").active=true;
        this.node.getChildByName("down").getChildByName("btn_start").active=true;
        this.choosekuang();
        event.target.getChildByName("btn_xuanze").active=true;
        this.node.getChildByName("biaoti").getChildByName("btn_xia").active=false;
        this.node.getChildByName("biaoti").getChildByName("btn_shang").active=true;
        this.tag=3
    },

    onLoad () {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
    },

    start () {
        this.tag;
    },

    // update (dt) {},
});
