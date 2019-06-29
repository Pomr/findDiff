cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad() {
        wx.login({
            success: function (msg) {
               console.log(msg)
            },
            fail: function (res) {
                console.log("fail");
                console.log(res)

            }
        })
        this.button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            style: {
                left: 100,
                top: 350,
                width: 200,
                height: 40,
                lineHeight: 500,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })
        console.log("yichuangjian")
        this.button.onTap((res) => {
            console.log(res.userInfo);
        })
    },

    start() {

    },

    // update (dt) {},
});
