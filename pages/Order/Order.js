// pages/Order/Order.js
let app = getApp()
const baseUrl = app.globalData.baseUrl
const utils = require("../../utils/util.js")
const baseUrls = `${baseUrl}/Api/Login/AccountLogin`//登录接口
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部订单', '配送中','已完成','已取消'],
    currentTab: 0,
    DeliveryList: [
      {
        CustomerId: "874356382",
        status: "配送中",
        Creator:"王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"在线支付",
        ReserveTime:"08:00-09:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      },
      {
        CustomerId: "874356382",
        status: "配送中",
        Creator: "张某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"09:00-10:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 12330,
            PrceType: "瓶",
            Quantity: 3,
          },
      
        ]
      },
      {
        CustomerId: "874356382",
        status: "配送中",
        Creator: "王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"14:00-15:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      }
    ],
    CompleteList: [
      {
        CustomerId: "874356382",
        status: "已完成",
        Creator: "王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"14:00-15:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      },
      {
        CustomerId: "874356382",
        status: "已完成",
        Creator: "王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"14:00-15:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      },
      {
        CustomerId: "874356382",
        status: "已完成",
        Creator: "王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"14:00-15:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      },
    ],
    EvaluateList: [
      {
        CustomerId: "874356382",
        status: "已取消",
        Creator: "王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"14:00-15:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      },
      {
        CustomerId: "874356382",
        status: "已取消",
        Creator: "王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"14:00-15:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      },
      {
        CustomerId: "874356382",
        status: "已取消",
        Creator: "王某某",
        Quantity: 11,
        Price: 1200,
        CreateMode:"货到付款",
        ReserveTime:"14:00-15:00",
        OrderTrackList:[
          {
            Operator:"李某某",
            OperateTime:"14:00",
          }
        ],
        goodsList: [
          {
            Name: "商品1",
            Price: 120,
            PrceType: "瓶",
            Quantity: 3,
          },
        ]
      },
    ],
    text: "btn",
    text2: "margin-right:12rpx;border: 2rpx solid #999;",
    text3: '取消订单'
  },
  //确认收货点击事件
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
  //已完成详情跳转
  CompleteDetails(){
    wx.navigateTo({
      url: "/pages/DeliveryDetails/DeliveryDetails",
    })
  },
  //配送详情跳转
  deliveryDetails(){
    wx.navigateTo({
      url: "/pages/DeliveryDetails/DeliveryDetails",
    })
  },
  //待评价详情跳转
  EvaluateDetails(){
    wx.navigateTo({
      url: "/pages/DeliveryDetails/DeliveryDetails",
    })
  },
  //导航控制
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 评价跳转页面
  Evaluate:function(){
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < this.data.CompleteList.length; i++) {
      let status = this.data.CompleteList[i].status
      if (status === "已完成") {
        this.setData({
          text: "",
          text2: "",
          text3: ''
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(baseUrl)
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        Phone: utils.Encryption(),
        Password: utils.Encryption()
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        
        if (res.data.Code == 200) {
          
        } else {
         
        }
      },
    })
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