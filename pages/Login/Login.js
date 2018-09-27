let {
  baseUrl,
  CustomerId
} = getApp().globalData
let app=getApp()
const baseUrls = `${baseUrl}/Api/Login/AccountLogin` //登录接口
const utils = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    let Phone = this.data.Phone
    let Password = this.data.Password
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
      success:res=> {
        //  CustomerId=res.data.Data
         console.log(CustomerId)
         app.globalData.CustomerId=res.data.Data
      },
    })
    wx.switchTab({
      url: '/pages/HomePage/HomePage'
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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