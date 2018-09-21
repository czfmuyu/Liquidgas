// pages/RepairDetailsComplete.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StateControl:0,
    btn:0,
    //模拟数据
    CustomerId: "874356382",
    status: "已处理",
    Creator: "王某某",
    date: "2018-08-23",
    time: "16:00",
    problem: "维修问题",
    describe: "打不着火打不着火打不着火打不着火打不着火打不着火",
    CreateMode: "在线支付",
    ReserveTime: "08:00-09:00",
    Address: "浙江省杭州市江千区浙江大学华家池校区西门对面三栋",
    Contact: "郑菲",
    Phone: "15000822230",
    OrderTrackList: {
      Operator: "张君名",
      OperateTime: "14:00",
      processing: "已解决",
      processingtext: "问题已解决问题已解决问题已解决问题已解题已解决",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.status === "待评价") {
      this.setData({
        StateControl:1,
        btn:1,
      })
    } else if (this.data.status === "未处理") {
      this.setData({
        StateControl:2,
        btn:2,
      })
    } else {
      this.setData({
        StateControl:1,
      })
    }
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