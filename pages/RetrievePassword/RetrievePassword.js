let app = getApp().globalData
const { baseUrl } = getApp().globalData
const baseUrls = app.baseUrl + '/Api/Login/ResetPassword' //忘记密码接口
const VerificationUrls = `${baseUrl}/Api/Common/SendVerificationCode`//获取验证码接口
const utils = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "获取验证码",
    currentTime: 60, //倒计时
    disabled: false, //按钮是否禁用
    // 电话
    phone: "",
    Verification: "",
    Password: "",
    confirmation: "",
  },
  bindButtonTap() {
    let this_ = this
    this_.setData({
      disabled: true
    })
    if (this_.data.phone == "") {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none',
        duration: 2000
      });
    } else {
      let currentTime = this_.data.currentTime
      let text = this_.data.text
      if (text === "获取验证码" || text === "重新发送") {
        this_.getVerification()
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
    }
  },
  //获取验证码
  getVerification() {
    wx.request({
      url: VerificationUrls,
      data: {
        Sign: "a",
        Mobile: this.data.phone,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
      },
    })
  },
  //修改密码提交
  Confirm() {
    if (this.data.phone == "" || this.data.Verification == "" || this.data.Password == "" || this.data.confirmation == "") {
      wx.showToast({
        title: '信息不能为空',
        icon: 'none',
        duration: 2000
      });
    } else {
      if (this.data.Password !== this.data.confirmation) {
        wx.showToast({
          title: '密码不一致',
          icon: 'none',
          duration: 2000
        });
      } else {
        wx.request({
          url: baseUrls,
          data: {
            Sign:"aa",
            Phone: this.data.phone,
            VerificationCode: this.data.Verification,
            Password: this.data.Password
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'post',
          success: res => {
            console.log(res)
            if (res.data.Data == true) {
              wx.redirectTo({
                url: "/pages/Login/Login",
              })
            }
          }
        });
      }
    }
  },
  // 获取电话
  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取验证码
  Verification(e) {
    this.setData({
      Verification: e.detail.value
    })
  },
  // 获取第一次输入的密码
  Password(e) {
    this.setData({
      Password: e.detail.value
    })
  },
  // 获取确认的密码
  confirmation(e) {
    this.setData({
      confirmation: e.detail.value
    })
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