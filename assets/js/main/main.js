var main = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {
        voice_kai: cc.SpriteFrame,
        voice_guan: cc.SpriteFrame,
        prefab_top: cc.Prefab,
        prefab_top_3: cc.Prefab,
        prefab_top_n: cc.Prefab,
        top_no1: cc.SpriteFrame,
        top_no2: cc.SpriteFrame,
        top_no3: cc.SpriteFrame,
        prefab_gonggao: cc.Prefab,
        m1: {
            default: null,
            type: cc.AudioClip,
        },
        m2: {
            default: null,
            type: cc.AudioClip,
        },
        m3: {
            default: null,
            type: cc.AudioClip,
        },
        m4: {
            default: null,
            type: cc.AudioClip,
        },
        m5: {
            default: null,
            type: cc.AudioClip,
        },
        m6: {
            default: null,
            type: cc.AudioClip,
        },
        m7: {
            default: null,
            type: cc.AudioClip,
        },
        music: {
            default: null,
            type: cc.AudioClip,
        },
    },

    onLoad() {
        this.kaiguan = true;
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        var mu1 = this.m1;
        var mu2 = this.m2;
        var mu3 = this.m3;
        var mu4 = this.m4;
        var mu5 = this.m5;
        var mu6 = this.m6;
        var mu7 = this.m7;
        this.song = [mu1, mu1, mu5, mu5, mu6, mu6, mu5, mu4, mu4, mu3, mu3, mu2, mu2, mu1, mu5, mu5, mu4, mu4, mu3, mu3, mu2, mu5, mu5, mu4, mu4, mu3, mu3, mu2, mu1, mu1, mu5, mu5, mu6, mu6, mu5, mu4, mu4, mu3, mu3, mu2, mu2, mu1];
        this.songno = 0;
        cc.audioEngine.playMusic(this.music, true);
    },

    click_wenhao: function () {
        if (this.node.getChildByName("kuang").y > 550) {
            var action = cc.moveBy(0.5, cc.v2(0, -this.node.getChildByName("kuang").height));
            var active = cc.moveBy(0.5, cc.v2(0, -150));
        }
        else {
            var action = cc.moveBy(0.5, cc.v2(0, +this.node.getChildByName("kuang").height));
            var active = cc.moveBy(0.5, cc.v2(0, 150));
        }
        this.node.getChildByName("kuang").runAction(action);
        this.node.getChildByName("help").runAction(active);
        this.a = cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_voice: function (event) {
        this.node.getChildByName("voice").active = true;
        event.target.parent.active = false;
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_voice1kaiguan: function (event) {      //音效
        if (this.kaiguan == true) {
            event.target.getComponent(cc.Sprite).spriteFrame = this.voice_guan;
            this.kaiguan = false;
        }
        else {
            event.target.getComponent(cc.Sprite).spriteFrame = this.voice_kai;
            this.kaiguan = true;
        }
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_voice2kaiguan: function (event) {
        if (this.kaiguan == true) {
            event.target.getComponent(cc.Sprite).spriteFrame = this.voice_guan;
            this.kaiguan = false;
        }
        else {
            event.target.getComponent(cc.Sprite).spriteFrame = this.voice_kai;
            this.kaiguan = true;
        }
    },

    click_voicetrue: function (event) {
        this.node.getChildByName("voice").active = false;
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_more: function (event) {
        event.target.getChildByName("list").active = !event.target.getChildByName("list").active
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_gonggao: function (event) {
        var gonggao = cc.instantiate(this.prefab_gonggao);
        this.node.addChild(gonggao);
        event.target.parent.active = false;
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_top: function (event) {
        //this.node.getChildByName("top").active=true;
        var top = cc.instantiate(this.prefab_top);
        this.node.addChild(top);
        var node_content = top.getChildByName("ranking").getChildByName("ScrollView").getChildByName("view").getChildByName("content");
        // console.log(main.top.showfriend())
        for (var i = 1; i <= main.top.showfriend(); i++) { //按顺序传入信息
            if (i == 1) {
                var no1 = cc.instantiate(this.prefab_top_3);
                node_content.height += 90;
                node_content.addChild(no1);
                no1.getChildByName("no").getComponent(cc.Sprite).spriteFrame = this.top_no1;
                no1.getChildByName("no").width = 50;
                no1.getChildByName("no").height = 66;
                main.top.settouxiang(no1.getChildByName("self").getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame);
                main.top.setname(no1.getChildByName("self").getChildByName("name").getComponent(cc.Label).string);
                main.top.setjiangbei(no1.getChildByName("jiangbei").getComponent(cc.Label).string);
                main.top.setchenghao(no1.getChildByName("chenghao").getChildByName("label").getComponent(cc.Label).string);
            }
            else if (i == 2) {
                var no2 = cc.instantiate(this.prefab_top_3);
                node_content.height += 90;
                node_content.addChild(no2);
                no2.getChildByName("no").getComponent(cc.Sprite).spriteFrame = this.top_no2;
                no2.getChildByName("no").width = 50;
                no2.getChildByName("no").height = 66;
                main.top.settouxiang(no2.getChildByName("self").getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame);
                main.top.setname(no2.getChildByName("self").getChildByName("name").getComponent(cc.Label).string);
                main.top.setjiangbei(no2.getChildByName("jiangbei").getComponent(cc.Label).string);
                main.top.setchenghao(no2.getChildByName("chenghao").getChildByName("label").getComponent(cc.Label).string);
            }
            else if (i == 3) {
                var no3 = cc.instantiate(this.prefab_top_3);
                node_content.height += 90;
                node_content.addChild(no3);
                no3.getChildByName("no").getComponent(cc.Sprite).spriteFrame = this.top_no3;
                no3.getChildByName("no").width = 50;
                no3.getChildByName("no").height = 66;
                main.top.settouxiang(no3.getChildByName("self").getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame);
                main.top.setname(no3.getChildByName("self").getChildByName("name").getComponent(cc.Label).string);
                main.top.setjiangbei(no3.getChildByName("jiangbei").getComponent(cc.Label).string);
                main.top.setchenghao(no3.getChildByName("chenghao").getChildByName("label").getComponent(cc.Label).string);
            }
            else {
                node_content.height += 70;
                var no = cc.instantiate(this.prefab_top_n);
                node_content.addChild(no);
                no.getChildByName("no").getComponent(cc.Label).string = i;
                main.top.settouxiang(no.getChildByName("self").getChildByName("touxiang").getComponent(cc.Sprite).spriteFrame);
                main.top.setname(no.getChildByName("self").getChildByName("name").getComponent(cc.Label).string);
                main.top.setjiangbei(no.getChildByName("jiangbei").getComponent(cc.Label).string);
                main.top.setchenghao(no.getChildByName("chenghao").getChildByName("label").getComponent(cc.Label).string);
            }
        }
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_11: function () {
        cc.director.loadScene("11")
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_12: function () {
        cc.director.loadScene("12");
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    click_21: function () {
        cc.director.loadScene("gamejingsu_one");
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
        main.find.mateReq();
    },

    click_22: function () {
        cc.director.loadScene("gamezhadan");
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }

    },

    click_23: function () {
        cc.director.loadScene("gamejingsu_team");
        cc.audioEngine.play(this.song[this.songno], false, 1);
        this.songno++;
        if (this.songno == 42) {
            this.songno = 0;
        }
    },

    start() {

    },
    // update (dt) {},
});
