const {
  baseUrl
} = getApp().globalData
const baseUrls = `${baseUrl}/Api/Common/InsertSuggestionFeedback` //提交建议接口
let app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [ //支付选择
      {
        name: '平台建议',
        checked: true
      },
      {
        name: '服务建议',
        checked: false
      }
    ],
    name: "平台建议",
    text: "",
  },
  //建议选项框点击事件
  radioChange: function(e) {
    this.setData({
      name: e.detail.value
    })
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    console.log(changed, e.detail.value)
    this.setData(changed)
  },
  //获取值
  getText(e) {
    console.log(e.detail.value)
    this.setData({
      text: e.detail.value
    })
  },

  //提交点击事件
  Submit() {
    let this_ = this
    let value = this.data.name
    let Type
    console.log(value)
    if (value == "平台建议") {
      Type = 0
    } else {
      Type = 10
    }
    wx.request({
      url: baseUrls,
      data: {
        Sign: "0",
        ObjectId: app.AccountId.AccountId,
        Type: Type,
        CustomerId: app.Customer.CustomerId,
        Content: this.data.text
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        if (res.data.Data == true) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          this_.setData({
            text: ""
          })
          wx.navigateTo({
            url: '/pages/Submit/Submit',
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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