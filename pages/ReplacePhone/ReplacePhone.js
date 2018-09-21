// pages/ReplacePhone/ReplacePhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: "13320722988",
    currentTime: 59, //倒计时
    disabled: false, //按钮是否禁用
    color: "#999999",
    phoneInput: "",
  },
  phoneInput(e) {//判断输入框是否输入值改变btn的颜色
    let this_ = this
    if (e.detail.value == "") {

    } else {
      this_.setData({
        color: "#2269d4"
      })
    }
  },
  bindButtonTap: function () {//倒计时触发事件
    let this_ = this
    this_.setData({
      disabled: true//只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
    })

    let currentTime = this_.data.currentTime
    if (currentTime === 59) {
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      let interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        this_.setData({
          currentTime: currentTime,
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          this_.setData({
            currentTime: 59,
            disabled: false,
          })
        }
      }, 1000)
    }
  },
  Confirm() {//确定点击事件
    wx.showToast({
      title: '修改成功',
      icon: 'none',
      duration: 2000
    });
    wx.switchTab({
      url: "/pages/My/My"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let num = "13320722988"
    let number1 = num.substring(0, 3) + "***" + num.substring(6, 11)//获取电话号码字符串截取
    this.data.number = number1
    this.setData(this.data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
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