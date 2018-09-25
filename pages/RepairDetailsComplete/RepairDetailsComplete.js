

let app = getApp()
var util = require('../../utils/util.js');
const baseUrl = app.globalData.baseUrl
// 获取维修订单
const baseUrls = `${baseUrl}/Api/RepairOrders/GetRepairOrderInfo`
			
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StateControl:0,
    btn:0,
    // 要渲染的数据
    detailedlist:{}
  },

// 跳转评价
  Evaluate:function(){
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    let orderIds=options.orderId
    wx.request({
      url:baseUrls,
      data:{
        sign:"",
        orderId:orderIds,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success:function(res){
        let detailed=res.data.Data
        console.log(detailed)
      _this.setData({
        detailedlist: detailed
      })
        let footer = _this.data.detailedlist
        let footerels = footer.Status
        if (footerels == 0) {
          _this.setData({
            btn: 2
          })
        } else if (footerels == 30) {
          _this.setData({
            btn: 1
          })
        } else {
          return false
        }
      }
    })

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