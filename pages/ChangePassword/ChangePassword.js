let app = getApp().globalData
const baseUrls = app.baseUrl + '/Api/Login/ChangeAccountPassword' //修改密码接口
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

  // 愿密码
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
    } else {
      if (this.data.Setthepassword === this.data.Confirmthepassword) {
        wx.request({
          url: baseUrls,
          data: {
            Sign: "",
            AccountId: app.AccountId.AccountId,
            CustomerId: app.Customer.CustomerId,
            Password: this.data.Setthepassword,
            OldPassword: this.data.Password
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'post',
          success: res => {
            console.log(res)
            if (res.data.Code == 200) {
              if (res.data.Data == true) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'none',
                  duration: 2000
                });
                // 循环将对象赋值为空
                let obj = app.Orderaddress
                console.log(obj)
                for (let key in obj) {
                  obj[key] = ''
                }
                for (let key in app) {
                  app[key] = ''
                }
                app.Orderaddress = obj
                wx.reLaunch({
                  url: '/pages/Login/Login',
                })
              }
            } else {
              wx.showToast({
                title: res.data.Msg,
                icon: 'none',
                duration: 2000
              });
            }
          }
        });
      } else {
        wx.showToast({
          title: "确认密码不一致!",
          icon: 'none',
          duration: 2000
        });
      }
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