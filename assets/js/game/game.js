var player = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {
        prefab_true: cc.Prefab,
        prefab_false: cc.Prefab,
        d1: cc.Vec2,
        d2: cc.Vec2,
        d3: cc.Vec2,
        p1: cc.SpriteFrame,
        p2: cc.SpriteFrame,
    },

    click_return: function () {
        cc.director.loadScene("3");
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        player.play.setnew_time();
        player.play.setnow()
        this.new_now = 0;
        this.cuowu = 3;
        this.shengcheng = true;
        this.node.getChildByName("tishi").getChildByName("label").getComponent(cc.Label).string = player.play.showtishi();
        this.schedule(function () {   //倒计时 （计时器）
            player.play.reducenew_time();
            var timeProgress = this.node.getChildByName("game").getChildByName("New ProgressBar").getComponent(cc.ProgressBar);
            timeProgress.progress = player.play.shownew_time() / player.play.showtime();
            //失败
            if (player.play.shownew_time() < 0) {
                cc.director.loadScene("lose");
            }
        }, 1);
        //开局倒计时  在倒计时到-2时 销毁当前计数器
        this.countdown = 3;
        this.callback = function () {
            if (this.countdown === -2) {
                this.unschedule(this.callback);
            }
            this.node.getChildByName("start").getChildByName("time").getComponent(cc.Label).string = this.countdown;
            this.countdown--;
        }
        this.schedule(this.callback, 1);
        if (player.play.shownow() == 0) {
            this.diff = [1, 2, 3];
            //1 第一处
            var node_but1 = new cc.Node("node_but1");
            node_but1.width = 80;
            node_but1.height = 80;
            node_but1.setPosition(this.d1.x, this.d1.y);
            node_1.addChild(node_but1);
            node_but1.addComponent(cc.Button);
            node_but1.on('click', this.click_1bu1, this);  //注册监听
            //1 第二处
            var node_but2 = new cc.Node("node_but2");
            node_but2.width = 80;
            node_but2.height = 80;
            node_but2.setPosition(this.d2.x, this.d2.y);
            node_1.addChild(node_but2);
            node_but2.addComponent(cc.Button);
            node_but2.on('click', this.click_1bu2, this);
            //1 第三处
            var node_but3 = new cc.Node("node_but3");
            node_but3.width = 80;
            node_but3.height = 80;
            node_but3.setPosition(this.d3.x, this.d3.y);
            node_1.addChild(node_but3);
            node_but3.addComponent(cc.Button);
            node_but3.on('click', this.click_1bu3, this);
            //2 第一处
            var node_but1 = new cc.Node("node_but1");
            node_but1.width = 80;
            node_but1.height = 80;
            node_but1.setPosition(this.d1.x, this.d1.y);
            node_2.addChild(node_but1);
            node_but1.addComponent(cc.Button);
            node_but1.on('click', this.click_2bu1, this);
            //2 第二处
            var node_but2 = new cc.Node("node_but2");
            node_but2.width = 80;
            node_but2.height = 80;
            node_but2.setPosition(this.d2.x, this.d2.y);
            node_2.addChild(node_but2);
            node_but2.addComponent(cc.Button);
            node_but2.on('click', this.click_2bu2, this);
            //2 第三处
            var node_but3 = new cc.Node("node_but3");
            node_but3.width = 80;
            node_but3.height = 80;
            node_but3.setPosition(this.d3.x, this.d3.y);
            node_2.addChild(node_but3);
            node_but3.addComponent(cc.Button);
            node_but3.on('click', this.click_2bu3, this);
            this.shengcheng = false;
            //button的事件生成   通过按钮完成
            var bu1 = new cc.Component.EventHandler();
            bu1.target = this.node;     //这个 node 节点是你的事件处理代码组件所属的节点
            bu1.component = "game";   //这个是代码文件名
            bu1.handler = "click_picture";
            var p1 = node_1.getComponent(cc.Button);
            p1.clickEvents.push(bu1);
            var p2 = node_2.getComponent(cc.Button);
            p2.clickEvents.push(bu1);
        }
    },

    destroy_node: function () {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        for (var i = node_1.childrenCount - 1; i >= 0; i--) {
            node_1.children[i].destroy();
        }
        for (var i = node_2.childrenCount - 1; i >= 0; i--) {
            node_2.children[i].destroy();
        }
    },

    //通过按钮完成
    click_picture: function (event) {
        if (player.play.showall() == player.play.shownow()) {
        }
        else {
            if (this.diff.length == 0) {

            }
            else {
                player.play.addnew_time(-this.cuowu);
                var timeProgress = this.node.getChildByName("game").getChildByName("New ProgressBar").getComponent(cc.ProgressBar);
                timeProgress.progress = player.play.shownew_time() / player.play.showtime();
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
            }

        }
        //错误标记的定时销毁 
        setTimeout(function () {
            wrong.destroy();
        }.bind(this), 700);
    },

    click_1bu1: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (this.diff.includes(1)) {
            //查找数组中是否有该值  有 true
            player.play.addnow();
            this.new_now++;
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d1.x, this.d1.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d1.x, this.d1.y);
            this.diff.splice(this.diff.indexOf(1), 1);
            node_1.getChildByName("node_but1").active = false;
            // console.log("1 bu1");
            node_2.getChildByName("node_but1").active = false;
            this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
            this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
        }
        if (this.new_now == player.play.shownow_all()) {
            this.scheduleOnce(function () {
                this.new_now = 0;
                this.diff = [1, 2, 3];
                this.destroy_node();
                node_1.getComponent(cc.Sprite).spriteFrame = this.p1;
                node_1.width = 550;
                node_1.height = 500;
                node_2.getComponent(cc.Sprite).spriteFrame = this.p2;
                node_2.width = 550;
                node_2.height = 500;
                //1 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_1bu1, this);  //注册监听
                //1 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_1bu2, this);
                //1 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_1.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_1bu3, this);
                //2 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                //2 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                //2 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_2.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_2bu3, this);
                this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
                this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
                //成功
                if (player.play.showall() == player.play.shownow()) {
                    cc.director.loadScene("win");
                }
            }, 1.5)
        }
    },

    click_1bu2: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (this.diff.includes(2)) {
            player.play.addnow();
            this.new_now++;
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d2.x, this.d2.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d2.x, this.d2.y);
            this.diff.splice(this.diff.indexOf(2), 1);
            // console.log("1 bu2");
            node_1.getChildByName("node_but2").active = false;
            node_2.getChildByName("node_but2").active = false;
            this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
            this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
        }
        if (this.new_now == player.play.shownow_all()) {
            this.scheduleOnce(function () {
                this.new_now = 0;
                this.diff = [1, 2, 3];
                this.destroy_node();
                node_1.getComponent(cc.Sprite).spriteFrame = this.p1;
                node_1.width = 550;
                node_1.height = 500;
                node_2.getComponent(cc.Sprite).spriteFrame = this.p2;
                node_2.width = 550;
                node_2.height = 500;
                //1 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_1bu1, this);  //注册监听
                //1 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_1bu2, this);
                //1 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_1.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_1bu3, this);
                //2 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                //2 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                //2 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_2.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_2bu3, this);
                this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
                this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
                //成功
                if (player.play.shownow() == player.play.showall()) {
                    cc.director.loadScene("win");
                }
            }, 1.5)
        }
    },

    click_1bu3: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (this.diff.includes(3)) {
            player.play.addnow();
            this.new_now++;
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d3.x, this.d3.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d3.x, this.d3.y);
            this.diff.splice(this.diff.indexOf(3), 1);
            // console.log("1 bu3");
            node_1.getChildByName("node_but3").active = false;
            node_2.getChildByName("node_but3").active = false;
            this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
            this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
        }
        if (this.new_now == player.play.shownow_all()) {
            this.scheduleOnce(function () {
                this.new_now = 0;
                this.diff = [1, 2, 3];
                this.destroy_node();
                node_1.getComponent(cc.Sprite).spriteFrame = this.p1;
                node_1.width = 550;
                node_1.height = 500;
                node_2.getComponent(cc.Sprite).spriteFrame = this.p2;
                node_2.width = 550;
                node_2.height = 500;
                //1 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_1bu1, this);  //注册监听
                //1 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_1bu2, this);
                //1 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_1.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_1bu3, this);
                //2 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                //2 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                //2 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_2.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_2bu3, this);
                this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
                this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
                //成功
                if (player.play.shownow() == player.play.showall()) {
                    cc.director.loadScene("win");
                }
            }, 1.5)
        }
    },

    click_2bu1: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (this.diff.includes(1)) {
            player.play.addnow();
            this.new_now++;
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d1.x, this.d1.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d1.x, this.d1.y);
            this.diff.splice(this.diff.indexOf(1), 1);
            // console.log("2 bu1");
            node_1.getChildByName("node_but1").active = false;
            node_2.getChildByName("node_but1").active = false;
            this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
            this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
        }
        if (this.new_now == player.play.shownow_all()) {
            this.scheduleOnce(function () {
                this.new_now = 0;
                this.diff = [1, 2, 3];
                this.destroy_node();
                node_1.getComponent(cc.Sprite).spriteFrame = this.p1;
                node_1.width = 550;
                node_1.height = 500;
                node_2.getComponent(cc.Sprite).spriteFrame = this.p2;
                node_2.width = 550;
                node_2.height = 500;
                //1 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_1bu1, this);  //注册监听
                //1 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_1bu2, this);
                //1 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_1.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_1bu3, this);
                //2 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                //2 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                //2 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_2.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_2bu3, this);
                this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
                this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
                //成功
                if (player.play.shownow() == player.play.showall()) {
                    cc.director.loadScene("win");
                }
            }, 1.5)
        }
    },

    click_2bu2: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (this.diff.includes(2)) {
            player.play.addnow();
            this.new_now++;
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d2.x, this.d2.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d2.x, this.d2.y);
            this.diff.splice(this.diff.indexOf(2), 1);
            // console.log("2 bu2");
            node_1.getChildByName("node_but2").active = false;
            node_2.getChildByName("node_but2").active = false;
            this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
            this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
        }
        if (this.new_now == player.play.shownow_all()) {
            this.scheduleOnce(function () {
                this.new_now = 0;
                this.diff = [1, 2, 3];
                this.destroy_node();
                node_1.getComponent(cc.Sprite).spriteFrame = this.p1;
                node_1.width = 550;
                node_1.height = 500;
                node_2.getComponent(cc.Sprite).spriteFrame = this.p2;
                node_2.width = 550;
                node_2.height = 500;
                //1 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_1bu1, this);  //注册监听
                //1 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_1bu2, this);
                //1 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_1.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_1bu3, this);
                //2 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                //2 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                //2 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_2.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_2bu3, this);
                this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
                this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
                //成功
                if (player.play.shownow() == player.play.showall()) {
                    cc.director.loadScene("win");
                }
            }, 1.5)
        }
    },

    click_2bu3: function (event) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        if (this.diff.includes(3)) {
            player.play.addnow();
            this.new_now++;
            //图1 的 成功 标记
            var right1 = cc.instantiate(this.prefab_true);
            node_1.addChild(right1);
            right1.setPosition(this.d3.x, this.d3.y);
            //图2 的 成功 标记
            var right2 = cc.instantiate(this.prefab_true);
            node_2.addChild(right2);
            right2.setPosition(this.d3.x, this.d3.y);
            this.diff.splice(this.diff.indexOf(3), 1);
            // console.log("2 bu3");
            node_1.getChildByName("node_but3").active = false;
            node_2.getChildByName("node_but3").active = false;
            this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
            this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
            this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
        }
        if (this.new_now == player.play.shownow_all()) {
            this.scheduleOnce(function () {
                this.new_now = 0;
                this.diff = [1, 2, 3];
                this.destroy_node();
                node_1.getComponent(cc.Sprite).spriteFrame = this.p1;
                node_1.width = 550;
                node_1.height = 500;
                node_2.getComponent(cc.Sprite).spriteFrame = this.p2;
                node_2.width = 550;
                node_2.height = 500;
                //1 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_1bu1, this);  //注册监听
                //1 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_1bu2, this);
                //1 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_1.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_1bu3, this);
                //2 第一处
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                //2 第二处
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                //2 第三处
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_2.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_2bu3, this);
                this.node.getChildByName("all").getChildByName("ProgressBar").getComponent(cc.ProgressBar).progress = player.play.shownow() / player.play.showall();
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = this.new_now / player.play.shownow_all();
                this.node.getChildByName("all").getChildByName("now").getComponent(cc.Label).string = player.play.shownow();
                //成功
                if (player.play.shownow() == player.play.showall()) {
                    cc.director.loadScene("win");
                }
            }, 1.5)
        }
    },

    click_tishi: function () {
        if (player.play.showtishi() > 0) {
            if (this.diff.length > 0) {
                player.play.reducetishi();
                this.node.getChildByName("tishi").getChildByName("label").getComponent(cc.Label).string = player.play.showtishi();
                if (this.diff[0] == 1) {
                    this.click_1bu1();
                }
                else if (this.diff[0] == 2) {
                    this.click_1bu2();
                }
                else {
                    this.click_1bu3();
                }
            }

        }
    },

    /*    通过触碰点完成
    touch: function () {
            var node_1 = this.node.getChildByName("game").getChildByName("1");
            var node_2 = this.node.getChildByName("game").getChildByName("2");
            var k1 = false, k2 = false, k3 = false;
            // 使用事件名来注册
            node_1.on('touchstart', function (event) {
                // console.log('1');
                console.log("start:" + event.touch.getLocationX(), event.touch.getLocationY());
                var click1 = node_1.convertToNodeSpaceAR(event.touch.getLocation()); //将触摸点移动到1点下的坐标
                var click2 = node_2.convertToNodeSpaceAR(event.touch.getLocation());
                if ((event.touch.getLocationX() >= this.d1.x - 40 && event.touch.getLocationX() <= this.d1.x + 40)   //给定x、y在一定范围(40)内
                    && (event.touch.getLocationY() >= this.d1.y - 40 && event.touch.getLocationY() <= this.d1.y + 40)) {
                    if (k1 == false) {
                        player.play.addnow();
                        this.new_now++;
                        //图1 的 成功 标记
                        var right1 = cc.instantiate(this.prefab_true);
                        node_1.addChild(right1);
                        right1.setPosition(click1.x, click1.y);
                        //图2 的 成功 标记
                        var right2 = cc.instantiate(this.prefab_true);
                        node_2.addChild(right2);
                        right2.setPosition(click2.x, click2.y - 422); //图片高度400 
                        k1 = true;
                    }
                    else {
                        var wrong = cc.instantiate(this.prefab_false);
                        event.target.addChild(wrong);
                        var pos = node_1.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                        wrong.setPosition(click1.x, click1.y);
                    }
                }
                else if ((event.touch.getLocationX() >= this.d2.x - 40 && event.touch.getLocationX() <= this.d2.x + 40)   //给定x、y在一定范围(40)内
                    && (event.touch.getLocationY() >= this.d2.y - 40 && event.touch.getLocationY() <= this.d2.y + 40)) {
                    if (k2 == false) {
                        player.play.addnow();
                        this.new_now++;
                        //图1 的 成功 标记
                        var right1 = cc.instantiate(this.prefab_true);
                        node_1.addChild(right1);
                        right1.setPosition(click1.x, click1.y);
                        //图2 的 成功 标记
                        var right2 = cc.instantiate(this.prefab_true);
                        node_2.addChild(right2);
                        right2.setPosition(click2.x, click2.y - 422); //图片高度400 
                        k2 = true;
                    }
                    else {
                        var wrong = cc.instantiate(this.prefab_false);
                        event.target.addChild(wrong);
                        var pos = node_1.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                        wrong.setPosition(click1.x, click1.y);
                    }
                }
                else if ((event.touch.getLocationX() >= this.d3.x - 40 && event.touch.getLocationX() <= this.d3.x + 40)   //给定x、y在一定范围(40)内
                    && (event.touch.getLocationY() >= this.d3.y - 40 && event.touch.getLocationY() <= this.d3.y + 40)) {
                    if (k3 == false) {
                        player.play.addnow();
                        this.new_now++;
                        //图1 的 成功 标记
                        var right1 = cc.instantiate(this.prefab_true);
                        node_1.addChild(right1);
                        right1.setPosition(click1.x, click1.y);
                        //图2 的 成功 标记
                        var right2 = cc.instantiate(this.prefab_true);
                        node_2.addChild(right2);
                        right2.setPosition(click2.x, click2.y - 422); //图片高度400 
                        k3 = true;
                    }
                    else {
                        var wrong = cc.instantiate(this.prefab_false);
                        event.target.addChild(wrong);
                        var pos = node_1.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                        wrong.setPosition(click1.x, click1.y);
                    }
                }
                else {
                    var wrong = cc.instantiate(this.prefab_false);
                    event.target.addChild(wrong);
                    var pos = node_1.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                    wrong.setPosition(click1.x, click1.y);
                }
            }.bind(this));
    
            node_2.on('touchstart', function (event) {
                console.log('2');
                console.log("start:" + event.touch.getLocationX(), event.touch.getLocationY());
                var click1 = node_1.convertToNodeSpaceAR(event.touch.getLocation()); //将触摸点移动到1点下的坐标
                var click2 = node_2.convertToNodeSpaceAR(event.touch.getLocation());
                if ((event.touch.getLocationX() >= this.d1.x - 40 && event.touch.getLocationX() <= this.d1.x + 40)   //给定x、y在一定范围(40)内
                    && (event.touch.getLocationY() >= this.d1.y - 422 - 40 && event.touch.getLocationY() <= this.d1.y - 422 + 40)) {
                    if (k1 == false) {
                        player.play.addnow();
                        this.new_now++;
                        //图1 的 成功 标记
                        var right1 = cc.instantiate(this.prefab_true);
                        node_2.addChild(right1);
                        right1.setPosition(click2.x, click2.y);
                        //图2 的 成功 标记
                        var right2 = cc.instantiate(this.prefab_true);
                        node_1.addChild(right2);
                        right2.setPosition(click1.x, click1.y + 422); //图片高度400 
                        k1 = true;
                    }
                    else {
                        var wrong = cc.instantiate(this.prefab_false);
                        event.target.addChild(wrong);
                        var pos = node_2.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                        wrong.setPosition(click2.x, click2.y);
                    }
                }
                else if ((event.touch.getLocationX() >= this.d2.x - 40 && event.touch.getLocationX() <= this.d2.x + 40)   //给定x、y在一定范围(40)内
                    && (event.touch.getLocationY() >= this.d2.y - 422 - 40 && event.touch.getLocationY() <= this.d2.y - 422 + 40)) {
                    if (k2 == false) {
                        player.play.addnow();
                        this.new_now++;
                        //图1 的 成功 标记
                        var right1 = cc.instantiate(this.prefab_true);
                        node_2.addChild(right1);
                        right1.setPosition(click2.x, click2.y);
                        //图2 的 成功 标记
                        var right2 = cc.instantiate(this.prefab_true);
                        node_1.addChild(right2);
                        right2.setPosition(click1.x, click1.y + 422); //图片高度400 
                        k2 = true;
                    }
                    else {
                        var wrong = cc.instantiate(this.prefab_false);
                        event.target.addChild(wrong);
                        var pos = node_2.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                        wrong.setPosition(click2.x, click2.y);
                    }
                }
                else if ((event.touch.getLocationX() >= this.d3.x - 40 && event.touch.getLocationX() <= this.d3.x + 40)   //给定x、y在一定范围(40)内
                    && (event.touch.getLocationY() >= this.d3.y - 422 - 40 && event.touch.getLocationY() <= this.d3.y - 422 + 40)) {
                    if (k3 == false) {
                        player.play.addnow();
                        this.new_now++;
                        //图1 的 成功 标记
                        var right1 = cc.instantiate(this.prefab_true);
                        node_2.addChild(right1);
                        right1.setPosition(click2.x, click2.y);
                        //图2 的 成功 标记
                        var right2 = cc.instantiate(this.prefab_true);
                        node_1.addChild(right2);
                        right2.setPosition(click1.x, click1.y + 422); //图片高度400 
                        k3 = true;
                    }
                    else {
                        var wrong = cc.instantiate(this.prefab_false);
                        event.target.addChild(wrong);
                        var pos = node_2.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                        wrong.setPosition(click2.x, click2.y);
                    }
                }
                else {
                    var wrong = cc.instantiate(this.prefab_false);
                    event.target.addChild(wrong);
                    var pos = node_2.convertToNodeSpaceAR(cc.v2(event.touch.getLocationX(), event.touch.getLocationY()));
                    wrong.setPosition(click2.x, click2.y);
                }
            }.bind(this));
    
        },  */

    start() {
        // this.touch();
    },

    update(dt) {
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        //开始倒计时
        if (this.countdown == -1) {
            this.node.getChildByName("start").getChildByName("time").active = false;
            this.node.getChildByName("start").getChildByName("start").active = true;
        }
        if (this.countdown == -2) {
            this.node.getChildByName("start").active = false;
            this.node.getChildByName("tishi").active=true;
        }
    }

});