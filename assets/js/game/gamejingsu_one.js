var jiaoben = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {
        prefab_true: cc.Prefab,
        prefab_false: cc.Prefab,
        p1: cc.SpriteFrame,
        prefab_headimg: cc.Prefab,
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);         //适应屏幕
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        this.cuowu = 2;   //若按错位置，一次减少2秒
        this.mapcount;
        //不同之处，图片初始化
        if (jiaoben.personal.shownow() == 0) {
            var bu1 = new cc.Component.EventHandler();
            bu1.target = this.node;         //这个 node 节点是你的事件处理代码组件所属的节点
            bu1.component = "game";         //这个是代码文件名
            bu1.handler = "click_picture";
            var p1 = node_1.getComponent(cc.Button);
            p1.clickEvents.push(bu1);
            var p2 = node_2.getComponent(cc.Button);
            p2.clickEvents.push(bu1);
        }
        //开局倒计时  在倒计时到-1时 销毁当前计数器
        this.countdown = 3;
        this.callback = function () {
            //开始倒计时
            if (this.countdown == 0) {
                this.node.getChildByName("start").getChildByName("time").active = false;
                this.node.getChildByName("start").getChildByName("start").active = true;
            }
            else if (this.countdown == -1) {
                this.node.getChildByName("start").destroy();
                this.unschedule(this.callback);
            }
            this.node.getChildByName("start").getChildByName("time").getComponent(cc.Label).string = this.countdown;
            this.countdown--;
        }
        this.schedule(this.callback, 1);
        //游戏倒计时 （计时器）
        this.schedule(function () {
            jiaoben.personal.reducetime();
            var timeProgress = this.node.getChildByName("game").getChildByName("New ProgressBar").getComponent(cc.ProgressBar);
            timeProgress.progress = jiaoben.personal.showreducetime() / jiaoben.personal.showtime();
        }, 1);
        //联网
        jiaoben.EventCenter.addListen(this, this.callback_mate, "Mate")
        jiaoben.EventCenter.addListen(this, this.callback_inmate, "Inmate")
        jiaoben.EventCenter.addListen(this, this.callback_find, "otherfind");
        jiaoben.EventCenter.addListen(this, this.callback_change, "change");     //点、图
        jiaoben.EventCenter.addListen(this, this.callback_jiesuan, "jiesuan");
    },

    callback_jiesuan: function (msg) { //结算
        console.log("结算")
        console.log(msg);
    },

    callback_find: function (msg) {     //他人找到不同之处
        console.log("找到不同之处");
        console.log(msg);
        for (var i = 0; i < this.node.getChildByName("jindu").childrenCount; i++) {
            if (this.node.getChildByName("jindu").children[i].getComponent("headimg").account == msg.account) {
                this.node.getChildByName("jindu").children[i].y = ((msg.picpro - 1) * 5 + msg.process) / (5 * this.mapcount) * this.node.getChildByName("jindu").height;  //总共25个不同处
            }
        }
    },

    callback_inmate: function (msg) {               //进入房间  初始化游戏界面用户信息
        this.mapcount = msg.roominfo.mapcount;
        for (var i = 0; i < msg.roominfo.playerList.length; i++) {
            var a = cc.instantiate(this.prefab_headimg);
            this.node.getChildByName("jindu").addChild(a);
            a.getComponent("headimg").headimg = msg.roominfo.playerList[i].headimg;    //头像
            a.getComponent("headimg").account = msg.roominfo.playerList[i].account;    //id
            for (var j = 0; j < msg.roominfo.playerList.length; j++) {
                if (a.getComponent("headimg").account == msg.roominfo.playerList[j].account) {
                    a.getChildByName("num").getChildByName("label").getComponent(cc.Label).string = j + 1;   //改变头像的1-4标记
                }
            }
        }
    },

    callback_change: function (msg) {    //切换图片 (创建不同之处的button) 
        this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = 0;
        jiaoben.personal.setreducetime();         //倒计时reducetime重置
        jiaoben.personal.addpnum();
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        this.destroy_node();
        jiaoben.personal.startdiff();
        jiaoben.personal.setnew_now();
        // node_1.getComponent(cc.Sprite).spriteFrame=msg.map.urlcorrect;    //换图片
        // node_2.getComponent(cc.Sprite).spriteFrame=msg.map.urlwrong;
        this.d1 = cc.v2(msg.map.vectorList[0].x, msg.map.vectorList[0].y);
        this.d2 = cc.v2(msg.map.vectorList[1].x, msg.map.vectorList[1].y);
        this.d3 = cc.v2(msg.map.vectorList[2].x, msg.map.vectorList[2].y);
        this.d4 = cc.v2(msg.map.vectorList[3].x, msg.map.vectorList[3].y);
        this.d5 = cc.v2(msg.map.vectorList[4].x, msg.map.vectorList[4].y);
        //1 第一处
        var node_but1 = new cc.Node("node_but1");
        node_but1.setPosition(this.d1.x, this.d1.y);
        node_1.addChild(node_but1);
        node_but1.addComponent(cc.Button);
        node_but1.on('click', this.click_1bu1, this);  //注册监听
        node_but1.addComponent(cc.Sprite);
        node_but1.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but1.width = 80;
        node_but1.height = 80;
        //1 第二处
        var node_but2 = new cc.Node("node_but2");
        node_but2.setPosition(this.d2.x, this.d2.y);
        node_1.addChild(node_but2);
        node_but2.addComponent(cc.Button);
        node_but2.on('click', this.click_1bu2, this);
        node_but2.addComponent(cc.Sprite);
        node_but2.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but2.width = 80;
        node_but2.height = 80;
        //1 第三处
        var node_but3 = new cc.Node("node_but3");
        node_but3.setPosition(this.d3.x, this.d3.y);
        node_1.addChild(node_but3);
        node_but3.addComponent(cc.Button);
        node_but3.on('click', this.click_1bu3, this);
        node_but3.addComponent(cc.Sprite);
        node_but3.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but3.width = 80;
        node_but3.height = 80;
        //1 第四处
        var node_but4 = new cc.Node("node_but4");
        node_but4.setPosition(this.d4.x, this.d4.y);
        node_1.addChild(node_but4);
        node_but4.addComponent(cc.Button);
        node_but4.on('click', this.click_1bu4, this);
        node_but4.addComponent(cc.Sprite);
        node_but4.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but4.width = 80;
        node_but4.height = 80;
        //1 第五处
        var node_but5 = new cc.Node("node_but5");
        node_but5.setPosition(this.d5.x, this.d5.y);
        node_1.addChild(node_but5);
        node_but5.addComponent(cc.Button);
        node_but5.on('click', this.click_1bu5, this);
        node_but5.addComponent(cc.Sprite);
        node_but5.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but5.width = 80;
        node_but5.height = 80;
        //2 第一处
        var node_but1 = new cc.Node("node_but1");
        node_but1.setPosition(this.d1.x, this.d1.y);
        node_2.addChild(node_but1);
        node_but1.addComponent(cc.Button);
        node_but1.on('click', this.click_1bu1, this);
        node_but1.addComponent(cc.Sprite);
        node_but1.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but1.width = 80;
        node_but1.height = 80;
        //2 第二处
        var node_but2 = new cc.Node("node_but2");
        node_but2.setPosition(this.d2.x, this.d2.y);
        node_2.addChild(node_but2);
        node_but2.addComponent(cc.Button);
        node_but2.on('click', this.click_1bu2, this);
        node_but2.addComponent(cc.Sprite);
        node_but2.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but2.width = 80;
        node_but2.height = 80;
        //2 第三处
        var node_but3 = new cc.Node("node_but3");
        node_but3.setPosition(this.d3.x, this.d3.y);
        node_2.addChild(node_but3);
        node_but3.addComponent(cc.Button);
        node_but3.on('click', this.click_1bu3, this);
        this.shengcheng = false;
        node_but3.addComponent(cc.Sprite);
        node_but3.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but3.width = 80;
        node_but3.height = 80;
        //2 第四处
        var node_but4 = new cc.Node("node_but4");
        node_but4.setPosition(this.d4.x, this.d4.y);
        node_2.addChild(node_but4);
        node_but4.addComponent(cc.Button);
        node_but4.on('click', this.click_1bu4, this);
        node_but4.addComponent(cc.Sprite);
        node_but4.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but4.width = 80;
        node_but4.height = 80;
        //2 第五处
        var node_but5 = new cc.Node("node_but5");
        node_but5.setPosition(this.d5.x, this.d5.y);
        node_2.addChild(node_but5);
        node_but5.addComponent(cc.Button);
        node_but5.on('click', this.click_1bu5, this);
        node_but5.addComponent(cc.Sprite);
        node_but5.getComponent(cc.Sprite).spriteFrame = this.p1;
        node_but5.width = 80;
        node_but5.height = 80;
    },

    click_picture: function (event) {
        jiaoben.personal.reducetimen(this.cuowu);
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        var wrong = cc.instantiate(this.prefab_false);
        event.target.addChild(wrong);
        if (event.target == node_1) {
            var pos = node_1.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
        }
        if (event.target == node_2) {
            var pos = node_2.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
        }
        wrong.setPosition(pos.x, pos.y);
        //错误标记的定时销毁 
        setTimeout(function () {
            wrong.destroy();
        }.bind(this), 1500);
    },

    destroy_node: function () {   //销毁图片下所有节点
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        for (var i = node_1.childrenCount - 1; i >= 0; i--) {
            node_1.children[i].destroy();
        }
        for (var i = node_2.childrenCount - 1; i >= 0; i--) {
            node_2.children[i].destroy();
        }
    },

    change_selfprogress: function () {     //改变自己的进度
        for (var i = 0; i < this.node.getChildByName("jindu").childrenCount; i++) {
            if (this.node.getChildByName("jindu").children[i].getComponent("headimg").account == jiaoben.account.showid()) {
                this.node.getChildByName("jindu").children[i].y = this.node.getChildByName("jindu").height * ((jiaoben.personal.showpnum() * jiaoben.personal.shownew_all() + jiaoben.personal.shownew_now()) / jiaoben.personal.showall());
                console.log(i);
            }
        }

    },

    click_1bu1: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (jiaoben.personal.showdiff().includes(1)) {    //查找数组中是否有该值,有=true
            jiaoben.personal.addnew_now();
            jiaoben.personal.addnow();
            //图1的成功标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d1.x, this.d1.y);
            //图2的成功标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d1.x, this.d1.y);
            jiaoben.personal.reducediff(1);
            node_1.getChildByName("node_but1").active = false;
            node_2.getChildByName("node_but1").active = false;
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = jiaoben.personal.shownew_now() / jiaoben.personal.shownew_all();
            this.change_selfprogress();
            jiaoben.find.finddiffReq();
        }
        //成功
        // if (jiaoben.personal.shownow() == jiaoben.personal.showall()) {
        //     var num = 20;
        //     this.node.getChildByName("end").active = true;
        //     this.callback = function () {
        //         if (this.countdown === -1) {
        //             this.unschedule(this.callback);
        //             cc.director.loadScene("one_over");
        //         }
        //         this.node.getChildByName("end").getChildByName("daojishi").getComponent(cc.Label).string = num;
        //         num--;
        //     }
        //     this.schedule(this.callback, 1);
        // }
    },

    click_1bu2: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (jiaoben.personal.showdiff().includes(2)) {
            jiaoben.personal.addnew_now();
            jiaoben.personal.addnow();
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d2.x, this.d2.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d2.x, this.d2.y);
            jiaoben.personal.reducediff(2);
            node_1.getChildByName("node_but2").active = false;
            node_2.getChildByName("node_but2").active = false;
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = jiaoben.personal.shownew_now() / jiaoben.personal.shownew_all();
            this.change_selfprogress();
            jiaoben.find.finddiffReq();
        }
        //成功
        // if (jiaoben.personal.shownow() == jiaoben.personal.showall()) {
        //     var num = 20;
        //     this.node.getChildByName("end").active = true;
        //     this.callback = function () {
        //         if (this.countdown === -1) {
        //             this.unschedule(this.callback);
        //             cc.director.loadScene("one_over");
        //         }
        //         this.node.getChildByName("end").getChildByName("daojishi").getComponent(cc.Label).string = num;
        //         num--;
        //     }
        //     this.schedule(this.callback, 1);
        // }
    },

    click_1bu3: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (jiaoben.personal.showdiff().includes(3)) {
            jiaoben.personal.addnew_now();
            jiaoben.personal.addnow();
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d3.x, this.d3.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d3.x, this.d3.y);
            jiaoben.personal.reducediff(3);
            node_1.getChildByName("node_but3").active = false;
            node_2.getChildByName("node_but3").active = false;
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = jiaoben.personal.shownew_now() / jiaoben.personal.shownew_all();
            this.change_selfprogress();
            jiaoben.find.finddiffReq();
        }
        //成功
        // if (jiaoben.personal.shownow() == jiaoben.personal.showall()) {
        //     var num = 20;
        //     this.node.getChildByName("end").active = true;
        //     this.callback = function () {
        //         if (this.countdown === -1) {
        //             this.unschedule(this.callback);
        //             cc.director.loadScene("one_over");
        //         }
        //         this.node.getChildByName("end").getChildByName("daojishi").getComponent(cc.Label).string = num;
        //         num--;
        //     }
        //     this.schedule(this.callback, 1);
        // }
    },

    click_1bu4: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (jiaoben.personal.showdiff().includes(4)) {
            jiaoben.personal.addnew_now();
            jiaoben.personal.addnow();
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d4.x, this.d4.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d4.x, this.d4.y);
            jiaoben.personal.reducediff(4);
            node_1.getChildByName("node_but4").active = false;
            node_2.getChildByName("node_but4").active = false;
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = jiaoben.personal.shownew_now() / jiaoben.personal.shownew_all();
            this.change_selfprogress();
            jiaoben.find.finddiffReq();
        }
        //成功
        // if (jiaoben.personal.shownow() == jiaoben.personal.showall()) {
        //     var num = 20;
        //     this.node.getChildByName("end").active = true;
        //     this.callback = function () {
        //         if (this.countdown === -1) {
        //             this.unschedule(this.callback);
        //             cc.director.loadScene("one_over");
        //         }
        //         this.node.getChildByName("end").getChildByName("daojishi").getComponent(cc.Label).string = num;
        //         num--;
        //     }
        //     this.schedule(this.callback, 1);
        // }
    },

    click_1bu5: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (jiaoben.personal.showdiff().includes(5)) {
            jiaoben.personal.addnew_now();
            jiaoben.personal.addnow();
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d5.x, this.d5.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d5.x, this.d5.y);
            jiaoben.personal.reducediff(5);
            node_1.getChildByName("node_but5").active = false;
            node_2.getChildByName("node_but5").active = false;
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = jiaoben.personal.shownew_now() / jiaoben.personal.shownew_all();
            this.change_selfprogress();
            jiaoben.find.finddiffReq();
        }
        //成功
        // if (jiaoben.personal.shownow() == jiaoben.personal.showall()) {
        //     var num = 20;
        //     this.node.getChildByName("end").active = true;
        //     this.callback = function () {
        //         if (this.countdown === -1) {
        //             this.unschedule(this.callback);
        //             cc.director.loadScene("one_over");
        //         }
        //         this.node.getChildByName("end").getChildByName("daojishi").getComponent(cc.Label).string = num;
        //         num--;
        //     }
        //     this.schedule(this.callback, 1);
        // }
    },

    start() {

    },

    update(dt) {

    },
});