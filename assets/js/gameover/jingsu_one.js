var jiaoben = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {
        prefab_3: cc.Prefab,
        prefab_4: cc.Prefab,
        pno1: cc.SpriteFrame,
        pno2: cc.SpriteFrame,
        pno3: cc.SpriteFrame,
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        jiaoben.EventCenter.addListen(this, this.callback_jiesuan, "jiesuan");
    },

    callback_jiesuan: function (msg) { //结算
        console.log("结算")
        console.log(msg);
        var layout = this.node.getChildByName("node").getChildByName("Layout");
        for (var i = 0; i < msg.playerList.length; i++) {
            if(msg.playerList[i].rank==1){
                var no1 = cc.instantiate(this.prefab_3);
                layout.addChild(no1);
                no1.getChildByName("no").getComponent(cc.Sprite).spriteFrame = this.pno1;
                no1.getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame=meg.playerList[i].nickname;
                no1.getChildByName("touxiang").getChildByName("name").getComponent(cc.Label).string=msg.playerList[i].account;
                no1.getChildByName("kuang").getChildByName("num").getComponent(cc.Label).string=msg.playerList[i].picprogress * 5 + msg.playerList[i].findprogress;
                no1.getChildByName("kuang").getChildByName("time").getComponent(xx.Label).string=msg.playerList[i].time;
                // no1.getChildByName("kuang").getChildByName("jifen").getComponent(cc,Label).striing=msg.playerList[i].
            }
            else if(msg.playerList[i]==2){
                var no2 = cc.instantiate(this.prefab_3);
                layout.addChild(no2);
                no2.getChildByName("no").getComponent(cc.Sprite).spriteFrame = this.pno2;
                no2.getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame=meg.playerList[i].nickname;
                no2.getChildByName("touxiang").getChildByName("name").getComponent(cc.Label).string=msg.playerList[i].account;
                no2.getChildByName("kuang").getChildByName("num").getComponent(cc.Label).string=msg.playerList[i].picprogress * 5 + msg.playerList[i].findprogress;
                no2.getChildByName("kuang").getChildByName("time").getComponent(xx.Label).string=msg.playerList[i].time;
                // no2.getChildByName("kuang").getChildByName("jifen").getComponent(cc,Label).striing=msg.playerList[i].
            }
            else if(msg.playerList[i]==3){
                var no3 = cc.instantiate(this.prefab_3);
                layout.addChild(no3);
                no3.getChildByName("no").getComponent(cc.Sprite).spriteFrame = this.pno3;
                no3.getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame=meg.playerList[i].nickname;
                no3.getChildByName("touxiang").getChildByName("name").getComponent(cc.Label).string=msg.playerList[i].account;
                no3.getChildByName("kuang").getChildByName("num").getComponent(cc.Label).string=msg.playerList[i].picprogress * 5 + msg.playerList[i].findprogress;
                no3.getChildByName("kuang").getChildByName("time").getComponent(xx.Label).string=msg.playerList[i].time;
                // no3.getChildByName("kuang").getChildByName("jifen").getComponent(cc,Label).striing=msg.playerList[i].
            }
            else if(msg.playerList[i]==4){
                var no4 = cc.instantiate(this.prefab_4);
                layout.addChild(no4);
                no4.getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame=meg.playerList[i].nickname;
                no4.getChildByName("touxiang").getChildByName("name").getComponent(cc.Label).string=msg.playerList[i].account;
                no4.getChildByName("kuang").getChildByName("num").getComponent(cc.Label).string=msg.playerList[i].picprogress * 5 + msg.playerList[i].findprogress;
                no4.getChildByName("kuang").getChildByName("time").getComponent(xx.Label).string=msg.playerList[i].time;
                // no4.getChildByName("kuang").getChildByName("jifen").getComponent(cc,Label).striing=msg.playerList[i].
            }
        }
    },

    click_back: function () {
        cc.director.loadScene("main");
    },

    start() {

    },

    // update (dt) {},
});
/*
{playerList: Array(2)}
playerList:Array(2)
 0:
   account:"100005"
   findprogress:4
   nickname:"会员5"
   picprogress:4
   rank:0
   time:""
   __proto__:Object
 1:
   account:"100006"
   findprogress:0
   nickname:"yyyy"
   picprogress:5
   rank:0
   time:""
   __proto__:Object
 length:2
__proto__:Array(0)
__proto__:Object
*/