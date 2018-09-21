// pages/Register/Register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "获取验证码",
    currentTime: 60, //倒计时
    disabled: false, //按钮是否禁用
    Tick:"",
  },
  //点击条款打钩事件
  Tick(){
    let T=this.data.Tick
    if(T==="√"){
      this.setData({
        Tick:""
      })
    }else{
      this.setData({
        Tick:"√"
      })
    }
  },
  //点击短信验证码发送事件
  bindButtonTap() {
    let this_ = this
    this_.setData({
      disabled: true
    })

    let currentTime = this_.data.currentTime
    let text = this_.data.text
    if (text === "获取验证码" || text === "重新发送") {
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      const interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        this_.setData({
          text: currentTime + "s",
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          this_.setData({
            text: '重新发送',
            currentTime: 60,
            disabled: false,
          })
        }
      }, 1000)
    }
  },
  //注册点击事件
  Register(){
    let Tick=this.data.Tick
    if(Tick==="√"){
      wx.navigateTo({//找回密码页面
        url: "/pages/Login/Login"
      })
    }else{
      wx.showToast({
        title: '未同意条款',
        icon: 'none',
        duration: 2000
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})