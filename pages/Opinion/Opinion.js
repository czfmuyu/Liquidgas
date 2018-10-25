const { baseUrl } = getApp().globalData
// const baseUrls = `${baseUrl}/Api/Common/GetSuggestionFeedbackByObjectId`//提交建议接口
let app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [//支付选择
      { name: '平台建议', checked: true},
      { name: '服务建议', checked: false}
    ],
  },
  //提交建议
  Submission(){
    wx.request({
      url: baseUrls,
      data: {},
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)
      },
    })
  },
  //建议选项框点击事件
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
  },

  //平台和建议切换点击事件
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  //提交点击事件
  Submit(){
    wx.navigateTo({
      url: '/pages/Submit/Submit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.CustomerId)
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