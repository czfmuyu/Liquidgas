// pages/Order/Order.js
let app = getApp().globalData
let { baseUrl } = getApp().globalData
const utils = require("../../utils/util.js")
const baseUrls = `${baseUrl}/Api/GasOrders/GetCustomerOrders` //获取订单列表接口
const baseUrl1 = `${baseUrl}/Api/GasOrders/GetPagedCustomerOrders`//获取已完成的订单接口
const cancel = `${baseUrl}/Api/GasOrders/CustomerCancelOrder` //取消订单
const Confirm = `${baseUrl}/Api/GasOrders/CustomerConfirmOrder` //确认订单

let Num = 2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShowModal: false, //弹框按钮操控
    navbar: ['全部订单', '配送中', '已完成', '已取消'],
    currentTab: 0,//0全部订单1配送中2已完成3已取消
    wholeList: [],
    DeliveryList: [],
    CompleteList: [],
    EvaluateList: [],
    text: "btn",
    text2: "margin-right:12rpx;border: 2rpx solid #999;",
    text3: '取消订单',
    searchKeyword: '', //需要搜索的字符
    searchPageNum: 1, // 设置加载的第几次，默认是第一次
    callbackcount: 5, //返回数据的个数
    CustomerId: "",
    // 取消原因
    getdata: "",
    // 取消订单id
    ID: "",
    // 唯一订单编号
    Serialnumber: "",

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
  //输入框事件，每输入一个字符，就会触发一次
  bindKeywordInput: function (e) {
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

  },
  //导航控制
  navbarTap(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    let currentTab = this.data.currentTab
    if (currentTab == 0) {//用户点击全部订单页面
      this.wholeInfo()
    } else if (currentTab == 1) {//用户点击配送中页面
      this.DeliveryList()
    } else if (currentTab == 2) {//用户点击已完成页面
      this.CompleteList()
    } else {//用户点击已取消页面
      this.EvaluateList()
    }
    console.log(currentTab)
  },
  //获取用户的CustomerId
  CustomerId() {
    console.log(app)
    // else {
    //   this.setData({
    //     CustomerId: app.CustomerId
    //   })
    //   console.log(app.CustomerId.CustomerId)
    // }
  },
  //取消订单信息
  EvaluateList() {
    let this_ = this
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        CustomerId: app.CustomerId,
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
      success: function (res) {
        console.log(res.data.Data)
        let data = res.data.Data
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            utils.Decrypt(data[i].CustomerName)
          }
        }
        //  else if (data.length == 0) {
        //   utils.Decrypt(data[0].CustomerName)
        // }
        this_.setData({
          EvaluateList: data
        })
        wx.stopPullDownRefresh() //停止下拉刷新
      },

    })
  },
  //已完成信息
  CompleteList() {
    let this_ = this
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrl1,
      data: {
        sign: "",
        CustomerId: app.CustomerId,
        pageIndex: searchPageNum,
        pageSize: callbackcount,
        queryKeyword: searchKeyword,
        status: "30,31",
        orderby: "",
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data.Data)
        if (res.data.Data !== undefined) {
          let data = res.data.Data
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              utils.Decrypt(data[i].CustomerName)
            }
          }
          this_.setData({
            CompleteList: data
          })
          wx.stopPullDownRefresh() //停止下拉刷新
        }

        //  else if (data.length == 0) {
        //   utils.Decrypt(data[0].CustomerName)
        // }
      },
    })
  },
  //配送中订单信息
  DeliveryList() {
    let this_ = this
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        CustomerId: app.CustomerId,
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
      success: function (res) {
        console.log(res.data.Data)
        let data = res.data.Data
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            utils.Decrypt(data[i].CustomerName)
          }
        }
        // else if (data.length == 0) {
        //   utils.Decrypt(data[0].CustomerName)
        // }
        this_.setData({
          DeliveryList: data
        })
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  //请求全部订单信息
  wholeInfo() {
    let this_ = this
    let searchKeyword = this_.data.searchKeyword
    let searchPageNum = this_.data.searchPageNum
    let callbackcount = this_.data.callbackcount
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        CustomerId: app.CustomerId,
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
      success: function (res) {
        console.log(res.data.Data)
        let data = res.data.Data
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            utils.Decrypt(data[i].CustomerName)
          }
        }
        // else if (data.length == 0) {
        //   utils.Decrypt(data[0].CustomerName)
        // }
        this_.setData({
          wholeList: data
        })
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  //详情跳转
  deliveryDetails(e) {
    wx.navigateTo({
      url: "/pages/DeliveryDetails/DeliveryDetails?id=" + e.currentTarget.dataset.id,
    })
  },

  // 评价跳转页面
  Evaluate(e) {
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate?id=' + e.currentTarget.dataset.id + "&index=" + 1,
    })
  },


  // 获取取消原因
  getdata: function (e) {
    let getdatas = e.detail.value
    this.setData({
      getdata: getdatas
    })
  },
  /**
   * 显示输入狂
   */
  cancel(e) {
    let orderid = e.target.dataset.orderid
    console.log(orderid)
    this.setData({
      ShowModal: true,
      ID: orderid,
    })
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    console.log(e)
    let _this = this
    // 用户
    let orderId = _this.data.ID
    // tu款说明
    let Explain = _this.data.getdata
    if (Explain !== "") {
      wx.request({
        url: cancel,
        data: {
          Sign: "",
          OrderId: orderId,
          CustomerId: app.CustomerId,
          Explain: Explain
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.Data == true) {
            _this.DeliveryList()
            _this.wholeInfo()
            _this.EvaluateList()
            wx.showToast({
              title: "取消成功！",
              icon: "none",
              duration: 2000
            });
            // 隐藏弹框
            _this.HideModal()
          } else {
            wx.showToast({
              title: "取消失败！",
              icon: "none",
              duration: 2000
            });
          }
        },
      })
    } else {
      wx.showToast({
        title: "请填写取消原因",
        icon: "none",
        duration: 1000
      });
    }
  },

  /**
   * 隐藏模态对话框
   */
  HideModal: function () {
    this.setData({
      ShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.HideModal();
  },
  // 确认收货
  Confirm: function (e) {
    let this_ = this
    let Orderid = e.currentTarget.dataset.orderid
    let Customerid = e.currentTarget.dataset.serial
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
      success: function (res) {
        this_.DeliveryList()
        this_.wholeInfo()
        this_.CompleteList()
        wx.showToast({
          title: "确认成功",
          duration: 2000
        });

      },
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
    // 判断用户是否选择用气编号,如果没有跳会首页
    if (app.GasNo.length > 1 && app.Customer.length > 1) {
      console.log("进来")
      wx.switchTab({
        url: '/pages/HomePage/HomePage'
      })
    }
    this.wholeInfo()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})