let app = getApp().globalData
let {
  Orderaddress
} = getApp().globalData
const baseUrls = app.baseUrl + '/Api/Customers/UpdateCustomerInfo'//修改地址上传接口
const utils = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    NameShowModal: false, //名称弹框控制
    PhoneShowModal: false, //电话弹框控制
    index: 0,
    longitudes: "",
    latitudes: "",
    storename: "",
    telephone: "",
    address: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.page() //判断页面跳转index
    console.log(app)
    if (Orderaddress.Contact !== "" || Orderaddress.Phone !== "" || Orderaddress.Address !== ""){
      this.setData({ //新用户没有数据的时候获取的信息
        storename: Orderaddress.Contact,
        telephone: Orderaddress.Phone,
        address: Orderaddress.Address,
        longitudes: Orderaddress.Longitude,
        latitudes: Orderaddress.Latitude,
      })
    } else {
      if (getApp().globalData.Customer !==null){
        this.setData({
          storename: getApp().globalData.Customer.CustomerName,
          telephone: getApp().globalData.Customer.CustomerPhone,
          address: getApp().globalData.Customer.CustomerAddress,
          latitudes: getApp().globalData.Customer.CustomerLatitude,
          longitudes: getApp().globalData.Customer.CustomerLongitude,
        })
        app.Orderaddress.Address = getApp().globalData.Customer.CustomerAddress
        app.Orderaddress.Contact = getApp().globalData.Customer.CustomerName
        app.Orderaddress.Latitude = getApp().globalData.Customer.CustomerLatitude
        app.Orderaddress.Longitude = getApp().globalData.Customer.CustomerLongitude
        app.Orderaddress.Phone = getApp().globalData.Customer.CustomerPhone
      }
      return false
    }
  },

  //获取页面传的值
  page() {
    let this_ = this
    wx.getStorage({
      key: 'page',
      success: function (res) {
        this_.setData({
          index: res.data
        })
      },
    })
  },

  // 提交地址
  submission() {
    if (this.data.storename == "" || this.data.telephone == "" || this.data.address==""){
      console.log(this.data)
      wx.showToast({
        title: "请完整填写信息！",
        icon: 'none',
        duration: 2000
      });
      return false
    }
    if (app.Customer !== null) {
      wx.request({
        url: baseUrls,
        data: {
          Sign: "",
          CustomerId: app.Customer.CustomerId,
          Name: utils.Encryption(this.data.storename),
          Phone: utils.Encryption(this.data.telephone),
          Address: utils.Encryption(this.data.address),
          Longitude: this.data.longitudes,
          Latitude: this.data.latitudes,
        },
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        success: res => {
          console.log(res)
        },
      })
    }
    let indexs = this.data.index
    if (indexs == 0) {
      wx.redirectTo({
        url: '/pages/OrderAddress/OrderAddress',
      })
    } else if (indexs == 1) {
      wx.switchTab({
        url: '/pages/My/My',
      })
    } else {
      wx.redirectTo({
        url: '/pages/Repair/Repair',
      })
    }
    // 提交地址的时候修改本地变量
    app.Orderaddress.Address = this.data.address
      app.Orderaddress.Contact = this.data.storename
    app.Orderaddress.Latitude = this.data.latitudes
      app.Orderaddress.Longitude = this.data.longitudes
    app.Orderaddress.Phone = this.data.telephone
  },
  // 获取姓名保存到全局
  GasNumber: function (e) {
    let value = e.detail.value
    this.setData({
      storename: value
    })
    Orderaddress.Contact = this.data.storename

  },

  // 获取电话保存到全局
  GasNumbers: function (e) {
    let value = e.detail.value
    this.setData({
      telephone: value
    })
    Orderaddress.Phone = this.data.telephone
  },
  /**
   * 电话弹窗
   */
  Phone() {
    this.setData({
      PhoneShowModal: true
    })
  },

  /**
   * 电话对话框取消按钮点击事件
   */
  onPhoneCancel: function () {
    Orderaddress.Phone = ""
    this.setData({
      telephone: "",
      PhoneShowModal: false
    });
  },
  /**
   * 电话对话框确认按钮点击事件
   */
  onPhoneConfirm: function () {
    let phone = this.data.telephone
    let telphone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!telphone.test(phone)) {
      this.setData({
        telephone: ""
      })
      wx.showToast({
        title: "电话输入有误！",
        icon: 'none',
        duration: 1000
      });
    } else {
      this.setData({
        PhoneShowModal: false
      });
    }
  },


  /**
   * 地址跳转页面
   */
  address() {
    wx.navigateTo({
      url: '/pages/ReceivingAddress/ReceivingAddress',
    })
  },


  /**
   * 名称弹窗
   */
  ReplaceName() {
    this.setData({
      NameShowModal: true
    })
  },
  /**
   * 名称弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },

  /**
   * 名称对话框取消按钮点击事件
   */
  onNameCancel: function () {
    Orderaddress.Contact = "",
      this.setData({
        storename: "",
        NameShowModal: false
      });
  },
  /**
   * 名称对话框确认按钮点击事件
   */
  onNameConfirm: function () {
    let storename = this.data.storename
    let name = /^[\u4E00-\u9FA5A-Za-z]{2,18}$/;
    if (!name.test(storename)) {
      this.setData({
        storename:""
      })
      wx.showToast({
        title: "姓名输入有误！",
        icon: 'none',
        duration: 1000
      });
    } else {
      this.setData({
        NameShowModal: false
      });
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