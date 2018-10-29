let app = getApp().globalData
const baseUrls = app.baseUrl + '/Api/Customers/ChangePassword' //修改密码接口
const utils = require("../../utils/util.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Password: "",
    Setthepassword: "",
    Confirmthepassword: ""
  },

  // 当前密码
  Password(e) {
    console.log(e.detail.value)
    this.setData({
      Password: e.detail.value
    })
  },
  //设置密码
  Setthepassword(e) {
    this.setData({
      Setthepassword: e.detail.value
    })
  },
  // 确认密码
  Confirmthepassword(e) {
    this.setData({
      Confirmthepassword: e.detail.value
    })
  },
  // 提交密码修改
  Preservation() {
    if (!this.data.Password || !this.data.Setthepassword || !this.data.Confirmthepassword) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.Setthepassword === this.data.Confirmthepassword) {
      wx.request({
        url: baseUrls,
        data: {
          Sign: "",
          CustomerId: app.Customer.CustomerId,
          Password: this.data.Setthepassword
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'post',
        success: res => {
          console.log(res)
        }
      });
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 2000
      });
      wx.switchTab({
        url: "/pages/My/My"
      })
    } else {
      wx.showToast({
        title: "确认密码不一致!",
        icon: 'none',
        duration: 2000
      });
    }
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