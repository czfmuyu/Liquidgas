const {
  baseUrl
} = getApp().globalData
const baseUrls = `${baseUrl}/Api/Login/AccountLogin` //登录接口
const utils = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tick: "",
    // 记住密码的值是10
    k:"",
    Phone: "",
    Password: ""
  },
  userName(e) {
    this.setData({
      Phone: e.detail.value
    })
  },
  password(e) {
    this.setData({
      Password: e.detail.value
    })
  },
  //登录点击事件
  onLogin() {
    let _this=this
    let Phone = _this.data.Phone
    let Password = _this.data.Password
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        Phone: utils.Encryption(Phone),
        Password: utils.Encryption(Password)
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function(res) {
        let k = _this.data.k
        if (res.data.Code == 200) {
          
          wx.setStorage({
            key: 'AccountId',
            data: {
              long: utils.Decrypt(res.data.Data),
              k:k,
            },
            success: () => {
              wx.switchTab({
                url: '/pages/HomePage/HomePage'
              })
            }
          });
        } else {
          wx.showToast({
            title: res.data.Msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
    })
  },
  //点击记住密码打钩事件
  Tick() {
    let T = this.data.Tick
    if (T === "√") {
      this.setData({
        Tick: ""
      })
    } else {
      this.setData({
        Tick: "√",
        k:10
      })
    }
  },
  //找回密码点击事件
  RetrievePassword() {
    wx.navigateTo({ //找回密码页面
      url: "/pages/RetrievePassword/RetrievePassword"
    })
  },
  //注册点击事件
  Register() {
    wx.navigateTo({ //注册密码页面
      url: "/pages/Register/Register"
    })
  },
  // 用户登录过直接登录
  loginload: function() {
    wx.switchTab({
      url: '/pages/HomePage/HomePage'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    // 获取本地缓存
    wx.getStorage({
      key: 'AccountId',
      success: function(res) {
    // 判断是否记住密码
        if (res.data.k==10) {
          _this.loginload()
        } else {
          wx.showToast({
            title: "请先登录",
            duration: 2000
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})