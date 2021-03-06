let { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/GetAccountCustomers`//获取个人数据接口
const Gas = `${baseUrl}/Api/Customers/BindCustomerAccount`//绑定用气编号接口
let app = getApp().globalData
const utils = require("../../utils/util.js")
// pages/HomePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,//用气编号切换索引
    showModal: false,
    newuser: false,
    showModalTwo: false,
    user: false,
    GasNo: "",
    value: "",//用气编号的值
  },
  OrderAddress() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({//订气地址页面
        url: "/pages/OrderAddress/OrderAddress"
      })
    }
  },
  Repair() {
    if (app.Customer != null && app.Customer != "") {
      console.log("第一个")
      if (app.Customer.GasNo != null && app.Customer.GasNo != "") {
        if (!this.pageLoading) {
          this.pageLoading = !0;
          wx.navigateTo({//维修页面
            url: "/pages/Repair/Repair"
          })
        }
      } else {
        utils.showError("无用气编号请联系服务商添加用气编号")
      }
    } else {
      utils.showError("无用气编号请联系服务商添加用气编号")
    }
  },
  Opinion() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({//意见反馈页面
        url: "/pages/Opinion/Opinion"
      })
    }
  },
  Security() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({//安全宣传页面
        url: "/pages/Security/Security"
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.ObtainStorage()
  },
  //用气编号选择点击事件
  onGasNo(e) {
    this.setData({
      showModalTwo: false,
    })
  },
  //用气编号chenge事件
  Enterprise(e){
    console.log(e)
    let index=e.detail.value
    let GasNo = this.data.GasNo;
    let Gas = [];
    Gas.push(GasNo[index])
    this.setData({
      GasNo: Gas,
      showModalTwo: false,
      index:index
    })
    console.log(app.Customer[index])
    app.Customer = app.Customer[index]
    app.CustomerId = app.Customer.CustomerId
  },
  //获取AccountId本地储存并获取个人数据
  ObtainStorage() {
    console.log(app.AccountId.AccountId)
    let this_ = this
    wx.request({//获取个人信息请求
      url: baseUrls,
      data: {
        Sign: "",
        AccountId: app.AccountId.AccountId,
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        let data = res.data.Data
        console.log(data)
        this_.decryption(data)
        let arr = [];
        if (res.data.Data == null) {
          if (app.GasState == true) {
            this_.setData({
              showModal: true
            })
          }
          return
        } else {
          for (let i = 0; i < res.data.Data.length; i++) {
            arr.push(res.data.Data[i].GasNo)//遍历用户所有的用气编号
            if (res.data.Data[i].IsMainAccount == false) {//遍历用户的子账号
              let data = res.data.Data[i]
              app.Subaccount = data//子账号存储
            }
          }
          for (let j = 0; j < arr.length; j++) {
            if (arr[j] == "" || arr[j] == null) {
              arr[j] = "请联系服务商添加用气编号"
            }
          }
          console.log(arr)
          app.GasNo = arr
          this_.setData({
            GasNo: arr
          })
        }
        this_.Tips()
        if (res.data.Data.length == 1) {
          console.log(data[0])
          app.Customer = data[0]
          app.CustomerId = data[0].CustomerId
        } else {
          console.log("多个数据")
          console.log(data)
          app.Customer = data
          app.CustomerId = data.CustomerId
        }
      },
    })
  },
  //获取的数据解密
  decryption(data) {
    if (data !== null) {
      data.map(item => {
        utils.Decrypt(item.CustomerName)
        utils.Decrypt(item.CustomerPhone)
        utils.Decrypt(item.CustomerAddress)
        utils.Decrypt(item.AccountName)
        utils.Decrypt(item.AccountPhone)
        utils.Decrypt(item.CustomerDetails)
      })
    }
    return data
  },
  Tips() {
    console.log(this.data.GasNo)
    if (this.data.GasNo.length > 1) {
      this.setData({
        showModalTwo: true
      })
    }
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    app.GasState = false
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    let this_ = this
    wx.request({
      url: Gas,
      data: {
        Sign: "",
        AccountId: app.AccountId.AccountId,
        GasNo: this_.data.value,
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        if (res.data.Data) {
          // getApp().globalData = {
          //   AccountId: "",
          //   CustomerId: "",
          //   Customer: null,
          //   CustomerList: null,
          //   Subaccount: null,
          //   GasNo: "",
          //   Orderaddress: { Contact: "", Phone: "", Address: "", Longitude: "", Latitude: "" }
          // }
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
        } else {
          utils.showError("输入的用气编号不存在，请重新输入")
        }
      },
    })
  },
  //获取编号弹框的值
  GasNumber(e) {
    this.setData({
      value: e.detail.value
    })
  },

  preventTouchMove: function () {
  },

  /**
   * 隐藏模态对话框
   */
  hideModalTwo: function () {
    this.setData({
      showModaltwo: false
    });
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
    console.log(app)
    // 控制用户不能重复点击
    this.pageLoading = !1;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (app.Customer == null) {
      this.onLoad()
    }
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