var bmob = require("lj1");
cc.Class({
    extends: cc.Component,

    properties: {
        prefab_false: cc.Prefab,
        prefab_true: cc.Prefab,
        prefab_choose: cc.Prefab,
    },

    onLoad() {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
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
        bmob.pong.settag();                        //测试
        this.d1 = bmob.pong.d1();
        console.log(this.d1.x, this.d1.y)
        this.d2 = bmob.pong.d2();
        console.log(this.d2.x, this.d2.y)
        this.d3 = bmob.pong.d3();
        this.d4 = bmob.pong.d4();
        this.d5 = bmob.pong.d5();
        //不同之处button的生成   
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        var node_but1 = new cc.Node("node_but1");
        //1
        node_but1.width = 80;
        node_but1.height = 80;
        node_but1.setPosition(this.d1.x, this.d1.y);
        node_1.addChild(node_but1);
        node_but1.addComponent(cc.Button);
        node_but1.on('click', this.click_bu1, this);  //注册监听
        //图2
        var node_but1 = new cc.Node("node_but1");
        node_but1.width = 80;
        node_but1.height = 80;
        node_but1.setPosition(this.d1.x, this.d1.y);
        node_2.addChild(node_but1);
        node_but1.addComponent(cc.Button);
        node_but1.on('click', this.click_bu1, this);  
        //2
        var node_but2 = new cc.Node("node_but2");
        node_but2.width = 80;
        node_but2.height = 80;
        // node_but2.setPosition(this.d2.x, this.d2.y);
        node_1.addChild(node_but2);
        node_but2.addComponent(cc.Button);
        node_but2.on('click', this.click_bu2, this);
        //图2
        var node_but2 = new cc.Node("node_but2");
        node_but2.width = 80;
        node_but2.height = 80;
        // node_but2.setPosition(this.d2.x, this.d2.y);
        node_2.addChild(node_but2);
        node_but2.addComponent(cc.Button);
        node_but2.on('click', this.click_bu2, this);
        //3
        var node_but3 = new cc.Node("node_but3");
        node_but3.width = 80;
        node_but3.height = 80;
        // node_but3.setPosition(this.d3.x, this.d3.y);
        node_1.addChild(node_but3);
        node_but3.addComponent(cc.Button);
        node_but3.on('click', this.click_bu3, this);
        //图2
        var node_but3 = new cc.Node("node_but3");
        node_but3.width = 80;
        node_but3.height = 80;
        // node_but3.setPosition(this.d3.x, this.d3.y);
        node_2.addChild(node_but3);
        node_but3.addComponent(cc.Button);
        node_but3.on('click', this.click_bu3, this);
        //4
        var node_but4 = new cc.Node("node_but4");
        node_but4.width = 80;
        node_but4.height = 80;
        // node_but4.setPosition(this.d4.x, this.d4.y);
        node_1.addChild(node_but4);
        node_but4.addComponent(cc.Button);
        node_but4.on('click', this.click_bu4, this);
        //图2
        var node_but4 = new cc.Node("node_but4");
        node_but4.width = 80;
        node_but4.height = 80;
        // node_but4.setPosition(this.d4.x, this.d4.y);
        node_2.addChild(node_but4);
        node_but4.addComponent(cc.Button);
        node_but4.on('click', this.click_bu4, this);
        //5
        var node_but5 = new cc.Node("node_but5");
        node_but5.width = 80;
        node_but5.height = 80;
        // node_but5.setPosition(this.d5.x, this.d5.y);
        node_1.addChild(node_but5);
        node_but5.addComponent(cc.Button);
        node_but5.on('click', this.click_bu5, this);
        //图2
        var node_but5 = new cc.Node("node_but5");
        node_but5.width = 80;
        node_but5.height = 80;
        // node_but5.setPosition(this.d5.x, this.d5.y);
        node_2.addChild(node_but5);
        node_but5.addComponent(cc.Button);
        node_but5.on('click', this.click_bu5, this);

        //button的事件生成   通过按钮完成
        var bu1 = new cc.Component.EventHandler();
        bu1.target = this.node;     //这个 node 节点是你的事件处理代码组件所属的节点
        bu1.component = "gamejingsu";   //这个是代码文件名
        bu1.handler = "click_picture";
        var p1 = node_1.getComponent(cc.Button);
        p1.clickEvents.push(bu1);
        var p2 = node_2.getComponent(cc.Button);
        p2.clickEvents.push(bu1);
    },

    click_picture: function () { //错误预制
        if (this.down = true) {
            if (bmob.pong.showtag() == bmob.pong.shownum()) {
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
                this.down = false;
                //错误标记的定时销毁 
            }
        }
        setTimeout(function () {
            wrong.destroy();
            this.down = true;
        }.bind(this), 2000);
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

    bulid_new:function(){    //若下一个人才是最后一张图片。。。
        if (bmob.pong.now == bmob.pong.showall()) {
            bmob.pong.now = 0;
            bmob.pong.startdiff();
            this.node.getChildByName("game").getChildByName("1").getComponent(cc.Sprite).spriteFrame = bmob.pong.showp1();
            this.node.getChildByName("game").getChildByName("2").getComponent(cc.Sprite).spriteFrame = bmob.pong.showp2();
            this.scheduleOnce(function () {
                this.destroy_node();
                node_1.getComponent(cc.Sprite).spriteFrame = this.p1;
                node_1.width = 470;
                node_1.height = 400;
                node_2.getComponent(cc.Sprite).spriteFrame = this.p2;
                node_2.width = 470;
                node_2.height = 400;
                //1 
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_bu1, this);  
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_bu1, this);
                //2
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_bu2, this);
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_bu2, this);
                //3
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_1.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_bu3, this);
                var node_but3 = new cc.Node("node_but3");
                node_but3.width = 80;
                node_but3.height = 80;
                node_but3.setPosition(this.d3.x, this.d3.y);
                node_2.addChild(node_but3);
                node_but3.addComponent(cc.Button);
                node_but3.on('click', this.click_bu3, this);
                //4
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_1.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                var node_but1 = new cc.Node("node_but1");
                node_but1.width = 80;
                node_but1.height = 80;
                node_but1.setPosition(this.d1.x, this.d1.y);
                node_2.addChild(node_but1);
                node_but1.addComponent(cc.Button);
                node_but1.on('click', this.click_2bu1, this);
                //5
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_1.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                var node_but2 = new cc.Node("node_but2");
                node_but2.width = 80;
                node_but2.height = 80;
                node_but2.setPosition(this.d2.x, this.d2.y);
                node_2.addChild(node_but2);
                node_but2.addComponent(cc.Button);
                node_but2.on('click', this.click_2bu2, this);
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = bmob.pong.now / bmob.pong.showall();
            }, 1.5)
        }
    },

    click_bu1: function () {
        if (bmob.pong.showtag() == bmob.pong.shownum()) {
            var node_1 = this.node.getChildByName("game").getChildByName("1");
            var node_2 = this.node.getChildByName("game").getChildByName("2");
            if (bmob.pong.showdiff().includes(1)) {
                //查找数组中是否有该值  有 true
                bmob.pong.now++;
                //图1 的 成功 标记
                var right1 = cc.instantiate(this.prefab_true);
                node_1.addChild(right1);
                right1.setPosition(this.d1.x, this.d1.y);
                //图2 的 成功 标记
                var right2 = cc.instantiate(this.prefab_true);
                node_2.addChild(right2);
                right2.setPosition(this.d1.x, this.d1.y);
                bmob.pong.delediff(1);
                node_1.getChildByName("node_but1").active = false;
                node_2.getChildByName("node_but1").active = false;
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = bmob.pong.now / bmob.pong.showall();
                bmob.pong.changenum();
            }
            this.bulid_new();
        }
    },

    click_bu2: function () {
        if (bmob.pong.showtag() == bmob.pong.shownum()) {
            var node_1 = this.node.getChildByName("game").getChildByName("1");
            var node_2 = this.node.getChildByName("game").getChildByName("2");
            if (bmob.pong.showdiff().includes(2)) {
                //查找数组中是否有该值  有 true
                bmob.pong.now++;
                //图1 的 成功 标记
                var right1 = cc.instantiate(this.prefab_true);
                node_1.addChild(right1);
                right1.setPosition(this.d2.x, this.d2.y);
                //图2 的 成功 标记
                var right2 = cc.instantiate(this.prefab_true);
                node_2.addChild(right2);
                right2.setPosition(this.d2.x, this.d2.y);
                bmob.pong.delediff(2)
                node_1.getChildByName("node_but1").active = false;
                node_2.getChildByName("node_but1").active = false;
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = bmob.pong.now / bmob.pong.showall();
                bmob.pong.changenum();
            }
            this.bulid_new();
        }
    },

    click_bu3: function () {
        if (bmob.pong.showtag() == bmob.pong.shownum()) {
            var node_1 = this.node.getChildByName("game").getChildByName("1");
            var node_2 = this.node.getChildByName("game").getChildByName("2");
            if (bmob.pong.showdiff().includes(3)) {
                //查找数组中是否有该值  有 true
                bmob.pong.now++;
                //图1 的 成功 标记
                var right1 = cc.instantiate(this.prefab_true);
                node_1.addChild(right1);
                right1.setPosition(this.d3.x, this.d3.y);
                //图2 的 成功 标记
                var right2 = cc.instantiate(this.prefab_true);
                node_2.addChild(right2);
                right2.setPosition(this.d3.x, this.d3.y);
                bmob.pong.delediff(3)
                node_1.getChildByName("node_but1").active = false;
                node_2.getChildByName("node_but1").active = false;
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = bmob.pong.now / bmob.pong.showall();
                bmob.pong.changenum();
            }
            this.bulid_new();
        }
    },

    click_bu4: function () {
        if (bmob.pong.showtag() == bmob.pong.shownum()) {
            var node_1 = this.node.getChildByName("game").getChildByName("1");
            var node_2 = this.node.getChildByName("game").getChildByName("2");
            if (bmob.pong.showdiff().includes(4)) {
                //查找数组中是否有该值  有 true
                bmob.pong.now++;
                //图1 的 成功 标记
                var right1 = cc.instantiate(this.prefab_true);
                node_1.addChild(right1);
                right1.setPosition(this.d4.x, this.d4.y);
                //图2 的 成功 标记
                var right2 = cc.instantiate(this.prefab_true);
                node_2.addChild(right4);
                right2.setPosition(this.d4.x, this.d4.y);
                bmob.pong.delediff(4)
                node_1.getChildByName("node_but1").active = false;
                node_2.getChildByName("node_but1").active = false;
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = bmob.pong.now / bmob.pong.showall();
                bmob.pong.changenum();
            }
            this.bulid_new();
        }
    },

    click_bu5: function () {
        if (bmob.pong.showtag() == bmob.pong.shownum()) {
            var node_1 = this.node.getChildByName("game").getChildByName("1");
            var node_2 = this.node.getChildByName("game").getChildByName("2");
            if (bmob.pong.showdiff().includes(5)) {
                //查找数组中是否有该值  有 true
                bmob.pong.now++;
                //图1 的 成功 标记
                var right1 = cc.instantiate(this.prefab_true);
                node_1.addChild(right1);
                right1.setPosition(this.d5.x, this.d5.y);
                //图2 的 成功 标记
                var right2 = cc.instantiate(this.prefab_true);
                node_2.addChild(right2);
                right2.setPosition(this.d5.x, this.d5.y);
                bmob.pong.delediff(5)
                node_1.getChildByName("node_but1").active = false;
                node_2.getChildByName("node_but1").active = false;
                this.node.getChildByName("now").getComponent(cc.ProgressBar).progress = bmob.pong.now / bmob.pong.showall();
                bmob.pong.changenum();
            }
            this.bulid_new();
        }
    },

    start() {

    },

    reducenum: function () {   //0 1 2
        var a = bmob.pong.shownum;
        if (a = 0) {
            a = 2
        }
        else {
            a--;
        }
        return a;
    },


    update(dt) {
        if (bmob.pong.shownum() == bmob.pong.showtag()) {
            this.choose = true;
            var a = cc.instantiate(this.prefab_choose);
            this.node.getChildByName("zhadan").getChildByName(this.reducenum().toString()).getChildByName("choose").destroy();
            this.node.getChildByName("zhadan").getChildByName(bmob.pong.showtag().toString()).addChild(a);
        }
        var node_1 = this.node.getChildByName("game").getChildByName("1");
        var node_2 = this.node.getChildByName("game").getChildByName("2");
        //开始倒计时
        if (this.countdown == -1) {
            this.node.getChildByName("start").getChildByName("time").active = false;
            this.node.getChildByName("start").getChildByName("start").active = true;
        }
        if (this.countdown == -2) {
            this.node.getChildByName("start").active = false;
        }
        this.bulid_new();
        if(bmob.pong.shownum() == bmob.pong.showtag() && bmob.pong.showtime()==0){
            bmob.pong.player.splice(bmob.pong.player.indexOf(bmob.pong.showtag().toString()),1); //该玩家结束游戏
            if(bmob.pong,player.length==1){
                cc.director.loadScene("one_over")    //场景待修改
            }
            else{
                bmob.pong.changenum();
            }
        }
    },
});
            //可以点击不同处 ->不同处未被点击过
            //炸弹选中自己 ->红圈 true



/*一个节点 this.node.getChildByName("zhadan") 四个孩子节点
一局三个人(三个节点) i=1.2.3  1.2 ++  3 ->0 
一个炸弹 距离爆炸n秒，动画    距离爆炸20秒，动画   在三个人头像框旁边移动（改变坐标）
被炸弹选中 i=j（玩家标记=炸弹当前位置） ，可点击图片     点击不同之处成功后 j++  炸弹往下一个人移动
炸弹初试位置 炸弹在不同位置j值不同 炸弹身上自带的j值 

无时间限制 错误一定时间内无法点击
*/