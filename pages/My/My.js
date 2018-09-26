const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/GetAccountCustomers`//获取个人数据接口
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用气编号
    Obtain: [],
    index: 0,
    Gas:""
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    let this_ = this
    wx.getStorage({
      key: 'index',
      success: function (res) {
        this_.setData({
          index: res.data
        })
      },
    })
    this_.ObtainStorage()
  },
  //获取AccountId本地储存并获取个人数据
  ObtainStorage() {
    let this_ = this
    wx.getStorage({
      key: 'AccountId',
      success: res => {
        wx.request({//获取个人信息请求
          url: baseUrls,
          data: {
            Sign: "",
            AccountId: res.data.long.AccountId,
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log(res.data.Data.length)
              for (let i = 0; i < res.data.Data.length; i++) {//把子账号信息存储本地
                if (res.data.Data[i].IsMainAccount == false) {
                  let data = res.data.Data[i]
                  wx.setStorageSync('Subaccount', data)
                }
              }
              this_.setData({
                Obtain: res.data.Data
              })
              this_.index()
          }
        })
      }
    })

  },
  index() {
    let data = this.data.Obtain
    let index = this.data.index;
    wx.setStorageSync('wholeGas', data)
    this.setData({
      data: data[index],
      Gas: data[index].GasNo
    })
    wx.setStorage({
      key: 'Information',
      data: data[index],
      success: function (res) {
        // success
      },
    })
  },
  SublevelAccount() {
    wx.navigateTo({//子账号页面
      url: "/pages/SublevelAccount/SublevelAccount"
    })
  },
  GasInformation() {
    wx.navigateTo({//用气信息页面
      url: "/pages/GasInformation/GasInformation",
    })
    let number = 1;
    wx.setStorage({
      key: 'page',
      data: number,
      success: function (res) {
        // success
      },
    })
  },
  PersonalData() {
    wx.navigateTo({//个人信息页面
      url: "/pages/PersonalData/PersonalData"
    })
  },
  Supplier() {
    wx.navigateTo({//供应商信息页面
      url: "/pages/Supplier/Supplier"
    })
  },
  BindingNumber() {
    wx.navigateTo({//绑定用气编号页面
      url: "/pages/BindingNumber/BindingNumber"
    })
  },
  AccountSecurity() {
    wx.navigateTo({//账号安全页面
      url: "/pages/AccountSecurity/AccountSecurity"
    })
  },
  Cancellation() {
    wx.navigateTo({//授权登录页面
      url: "/pages/Authorized/Authorized"
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