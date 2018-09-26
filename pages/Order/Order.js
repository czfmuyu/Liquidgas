// pages/Order/Order.js
let app = getApp()
const baseUrl = app.globalData.baseUrl
const utils = require("../../utils/util.js")
const baseUrls = `${baseUrl}/Api/GasOrders/GetGasOrders` //获取订单列表接口
const cancel = `${baseUrl}/Api/RepairOrders/GasOrderCancel` //获取订单列表接口
// 确ren
const Confirm = `${baseUrl}/Api/RepairOrders/GasOrderConfirml` //获取订单列表接口

let Num = 2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShowModal: false, //弹框按钮操控
    navbar: ['全部订单', '配送中', '已完成', '已取消'],
    currentTab: 0,
    wholeList: [],
    DeliveryList: [],
    CompleteList: [],
    EvaluateList: [],
    text: "btn",
    text2: "margin-right:12rpx;border: 2rpx solid #999;",
    text3: '取消订单',
    searchKeyword: '', //需要搜索的字符
    searchPageNum: 1, // 设置加载的第几次，默认是第一次
    callbackcount: 3, //返回数据的个数
    CustomerId: "",
    // 取消原因
    getdata: "",
    // 取消订单id
    ID: "",
    // 唯一订单编号
    Serialnumber: "",

  },

  //输入框事件，每输入一个字符，就会触发一次
  bindKeywordInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
    this.wholeInfo()
    this.DeliveryList()
    this.CompleteList()
    this.EvaluateList()

  },
  //输入框清空事件
  Delete() {
    this.setData({
      searchKeyword: ""
    })
    this.wholeInfo()
    this.DeliveryList()
    this.CompleteList()
    this.EvaluateList()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.CustomerId()
    this.wholeInfo()
    this.DeliveryList()
    this.CompleteList()
    this.EvaluateList()

  },
  CustomerId() {
    let data = wx.getStorageSync('Information')
    this.setData({
      CustomerId: data.CustomerId
    })
  },
  //取消订单信息
  EvaluateList() {
    let this_ = this
    let CustomerId = this_.data.CustomerId
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        CustomerId: CustomerId,
        pageIndex: searchPageNum,
        pageSize: callbackcount,
        queryKeyword: searchKeyword,
        status: 100
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        let data = res.data.Data
        for (let i = 0; i < data[i].length; i++) {
          utils.Decrypt(data[i].CustomerName)
        }
        this_.setData({
          EvaluateList: data
        })
      },
    })
  },
  //已完成信息
  CompleteList() {
    let this_ = this
    let CustomerId = this_.data.CustomerId
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        CustomerId: CustomerId,
        pageIndex: searchPageNum,
        pageSize: callbackcount,
        queryKeyword: searchKeyword,
        status: 30
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        let data = res.data.Data
        for (let i = 0; i < data[i].length; i++) {
          utils.Decrypt(data[i].CustomerName)
        }
        this_.setData({
          CompleteList: data
        })
      },
    })
  },
  //配送中订单信息
  DeliveryList() {
    let this_ = this
    let CustomerId = this_.data.CustomerId
    console.log(CustomerId)
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        CustomerId: CustomerId,
        pageIndex: searchPageNum,
        pageSize: callbackcount,
        queryKeyword: searchKeyword,
        status: 0
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        let data = res.data.Data
        for (let i = 0; i < data[i].length; i++) {
          utils.Decrypt(data[i].CustomerName)
        }
        this_.setData({
          DeliveryList: data
        })
      },
    })
  },
  //请求全部订单信息
  wholeInfo() {
    let this_ = this
    let CustomerId = this_.data.CustomerId
    console.log(CustomerId)
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        CustomerId: CustomerId,
        pageIndex: searchPageNum,
        pageSize: callbackcount,
        queryKeyword: searchKeyword,
        status: -1
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {

        let data = res.data.Data
        for (let i = 0; i < data[i].length; i++) {
          utils.Decrypt(data[i].CustomerName)
        }
        this_.setData({
          wholeList: data
        })
      },
    })
  },

  //确认收货点击事件
  onconfirm() {
    wx.showToast({
      title: '确认成功',
      icon: 'success',
      duration: 2000
    })
  },
  //删除订单点击事件
  onCancel() {
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 2000
    })
  },
  //详情跳转
  deliveryDetails(e) {
    wx.navigateTo({
      url: "/pages/DeliveryDetails/DeliveryDetails?id=" + e.currentTarget.dataset.id,
    })
  },
  //导航控制
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 评价跳转页面
  Evaluate: function() {
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate',
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.wholeInfo()
    this.DeliveryList()
    this.CompleteList()
    this.EvaluateList()
    wx.showToast({
      title: "加载中",
      icon: 'loading',
      duration: 2000
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let CustomerId = this.data.CustomerId
    console.log(CustomerId)
    let count = this.data.callbackcount * Num
    this.setData({
      searchPageNum: this.data.searchPageNum,
      callbackcount: count,
    })
    Num++;
    this.wholeInfo()
    this.DeliveryList()
    this.CompleteList()
    this.EvaluateList()
    wx.showToast({
      title: "加载中",
      icon: 'loading',
      duration: 2000
    });

  },

  // 获取取消原因
  getdata: function(e) {
    let _this = this
    let getdatas = e.detail.value
    _this.setData({
      getdata: getdatas
    })
  },
  /**
   * 显示输入狂
   */
  phoneList(e) {
    let _this = this
    let id = e.target.dataset.orderid
    let orderID = e.target.dataset.serial
    _this.setData({
      ShowModal: true,
      ID: id,
      Serialnumber: orderID
    })
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function(e) {
    let _this = this
    // 订单
    let tomerId = _this.data.Serialnumber
    // 用户
    let orderId = _this.data.ID
    // tu款说明
    let Explain = _this.data.getdata
    console.log(Explain + tomerId + orderId)
    if (Explain !== "") {
      wx.request({
        url: cancel,
        data: {
          Sign: "",
          OrderId: orderId,
          CustomerId: tomerId,
          Explain: Explain
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          // let orderData = res.data.Data
          // _this.setData({
          //   ProcessedList: orderData
          // })

        },
      })
    } else {
      wx.showToast({
        title: "请填写取消原因",
        duration: 1000
      });
    }
    // 隐藏弹框
    this.HideModal()
  },

  /**
   * 隐藏模态对话框
   */
  HideModal: function() {
    this.setData({
      ShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.HideModal();
  },
  // 确认订单
  Confirm: function(e) {
    let Orderid = e.currentTarget.dataset.orderid
    let Customerid = e.currentTarget.dataset.serial
    console.log(e)
    wx.request({
      url: Confirm,
      data: {
        Sign: "",
        OrderId: Orderid,
        CustomerId: Customerid,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        // let orderData = res.data.Data
        // _this.setData({
        //   ProcessedList: orderData
        // })

      },
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})