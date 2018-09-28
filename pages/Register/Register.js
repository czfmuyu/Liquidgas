const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Login/AccountRegister`//登录接
const utils = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "获取验证码",
    currentTime: 60, //倒计时
    disabled: false, //按钮是否禁用
    Tick: "",
    Name: "",
    Phone: "",
    Password: "",
    confirmPassword: "",
    VerificationCode: ""
  },
  UserReg(e) {
    let data = this.data
    let value = e.detail.value
    let index = e.target.dataset.text
    data[index] = value
  },
  //点击条款打钩事件
  Tick() {
    let T = this.data.Tick
    if (T === "√") {
      this.setData({
        Tick: ""
      })
    } else {
      this.setData({
        Tick: "√"
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
  Register() {
    let this_ = this
    let Tick = this_.data.Tick
    if (this_.data.Name !== "" && this_.data.Phone !== "" && this_.data.Password !== "" && this_.data.confirmPassword !== "" && this_.data.VerificationCode !== "") {
      if (/^[\u4e00-\u9fa5]{2,3}$/.test(this_.data.Name)) {
        if (/^1[34578]\d{9}$/.test(this_.data.Phone)) {
          if (/^[\w_-]{6,16}$/.test(this_.data.Password)) {
            if (Tick === "√") {
              if (this_.data.Password === this_.data.confirmPassword) {
                wx.request({
                  url: baseUrls,
                  data: {
                    Sign: "",
                    Name: utils.Encryption(this_.data.Name),
                    Phone: utils.Encryption(this_.data.Phone),
                    Password: utils.Encryption(this_.data.Password),
                    VerificationCode: utils.Encryption(this_.data.VerificationCode)
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: 'post',
                  success: function (res) {
                    console.log(res)
                    if (res.data.Code == 200) {
                      wx.switchTab({//登录页面
                        url: "/pages/HomePage/HomePage"
                      })
                    } else if (res.data.Code == 506) {
                      wx.showToast({
                        title: res.data.Msg,
                        icon: 'none',
                        duration: 2000
                      });
                    }

                  },
                })
              } else {
                wx.showToast({
                  title: '密码不一致',
                  icon: 'none',
                  duration: 2000
                });
              }
            } else {
              wx.showToast({
                title: '未同意条款',
                icon: 'none',
                duration: 2000
              });
            }
          }else {
            wx.showToast({
              title: '请输入6-16位数字和字母的组合密码',
              icon: 'none',
              duration: 2000
            });
          }
         } else {
            wx.showToast({
              title: '手机号码有误',
              icon: 'none',
              duration: 2000
            });
          }
        } else {
          wx.showToast({
            title: '姓名有误',
            icon: 'none',
            duration: 2000
          });
        }
    } else {
      wx.showToast({
        title: '请完善您的信息',
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