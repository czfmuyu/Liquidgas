// pages/RepairOrder/RepairOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部订单', '待维修', '维修完成','已取消'],
    currentTab: 0,
    UntreatedList:[
      {
        CustomerId: "874356382",
        status: "待维修",
        Creator: "王某某",
        date: "2018-08-23",
        time: "16:00",
        problem:"维修问题",
        describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
      },
      {
        CustomerId: "874356382",
        status: "待维修",
        Creator: "张某某",
        date: "2018-08-23",
        time: "16:00",
        problem:"维修问题",
        describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
      },
      {
        CustomerId: "874356382",
        status: "待维修",
        Creator: "李某某",
        date: "2018-08-23",
        time: "16:00",
        problem:"维修问题",
        describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
      }
    ],
    ProcessedList:[
      {
        CustomerId: "874356382",
        status: "维修完成",
        Creator: "王某某",
        date: "2018-08-23",
        time: "16:00",
        problem:"维修问题",
        describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
      },
      {
        CustomerId: "874356382",
        status: "维修完成",
        Creator: "张某某",
        date: "2018-08-23",
        time: "16:00",
        problem:"维修问题",
        describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
      },
      {
        CustomerId: "874356382",
        status: "维修完成",
        Creator: "李某某",
        date: "2018-08-23",
        time: "16:00",
        problem:"维修问题",
        describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
      },
    ],
  EvaluateList:
  [
    {
      CustomerId: "874356382",
      status: "已取消",
      Creator: "王某某",
      date: "2018-08-23",
      time: "16:00",
      problem:"维修问题",
      describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
    },
    {
      CustomerId: "874356382",
      status: "已取消",
      Creator: "张某某",
      date: "2018-08-23",
      time: "16:00",
      problem:"维修问题",
      describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
    },
    {
      CustomerId: "874356382",
      status: "已取消",
      Creator: "李某某",
      date: "2018-08-23",
      time: "16:00",
      problem:"维修问题",
      describe:"打不着火打不着火打不着火打不着火打不着火打不着火",
    },
  ],
  text2:"#2269d4",
  text3:"确认完成",
  },
  //确认完成点击事件
  onconfirm(){
    wx.showToast({
      title: '确认成功',
      icon: 'success',
      duration: 2000
    })
  },
   //删除订单点击事件
   onCancel(){
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 2000
    })
  },
  //已处理详情
  onQueryBtn(){
    wx.navigateTo({
      url: '/pages/RepairDetailsComplete/RepairDetailsComplete',
    })
  },
  //未处理详情
  queryBtn(){
    wx.navigateTo({
      url: '/pages/RepairDetailsComplete/RepairDetailsComplete',
    })
  },
  //待评价详情
  onEvaluate(){
    wx.navigateTo({
      url: '/pages/RepairDetailsComplete/RepairDetailsComplete',
    })
  },
 
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 评价跳转页面
  Evaluate: function () {
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < this.data.ProcessedList.length; i++) {
      let status = this.data.ProcessedList[i].status
      if (status === "已处理") {
        this.setData({
          text2: "#d45d22",
          text3: '去评价'
        })
      }
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