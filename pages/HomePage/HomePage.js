let { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/GetAccountCustomers`//获取个人数据接口
let app = getApp().globalData
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
    GasNo: []
  },
  OrderAddress() {
    wx.navigateTo({//订气地址页面
      url: "/pages/OrderAddress/OrderAddress"
    })
  },
  Repair() {
    wx.navigateTo({//维修页面
      url: "/pages/Repair/Repair"
    })
  },
  Opinion() {
    wx.navigateTo({//意见反馈页面
      url: "/pages/Opinion/Opinion"
    })
  },
  Security() {
    wx.navigateTo({//安全宣传页面
      url: "/pages/Security/Security"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.ObtainStorage()
  },
  //用气编号选择点击事件
  onGasNo(e) {
    let index = e.currentTarget.dataset.index;
    let GasNo = this.data.GasNo;
    let Gas = [];
    Gas.push(GasNo[index])
    this.setData({
      GasNo: Gas,
      showModalTwo: false,
      index: index
    })
    app.Customer=app.Customer[index]
  },
  //获取AccountId本地储存并获取个人数据
  ObtainStorage() {
    let this_ = this
    wx.request({//获取个人信息请求
      url: baseUrls,
      data: {
        Sign: "",
        AccountId: app.CustomerId.AccountId,
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        let data = res.data.Data
        let arr = [];
        if (res.data.Data == null) {
          return
        } else {
          for (let i = 0; i < res.data.Data.length; i++) {
            arr.push(res.data.Data[i].GasNo)//遍历用户所有的用气编号
            app.GasNo=arr
            if (res.data.Data[i].IsMainAccount == false) {//遍历用户的子账号
              let data = res.data.Data[i]
              app.Subaccount=data//子账号存储
            }
          }
          this_.setData({
            GasNo: arr
          })
        }
        this_.Tips()
        if (res.data.Data.length == 0) {
          app.Customer = data[0]
        } else {
          app.Customer = data
        }

      },
    })
  },
  Tips() {
    console.log(this.data.GasNo)
    if (this.data.GasNo.length > 1) {
      this.setData({
        showModalTwo: true
      })
    } else {
      this.setData({
        showModal: true
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
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
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