const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/GetCustomerInfo`//获取当前信息接口
let app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用气编号
    index: 0,
    Gas: "",
    // 子帐号页面显示与影藏
    state: false
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad(options) {

  },
  CurrentInfo() {
    let this_ = this
    if (app.CustomerId.CustomerId !== undefined){
      wx.request({
        url: baseUrls,
        data: {
          Sign: "",
          AccountId: app.AccountId.AccountId,
          CustomerId: app.CustomerId
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res.data.Data)
          app.Customer = res.data.Data
          this_.setData({
            Gas: res.data.Data.GasNo
          })
        },
      })
    }
    return false
  },
  SublevelAccount() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({//子账号页面
      url: "/pages/SublevelAccount/SublevelAccount"
    })
    }
  },
  GasInformation() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({//用气信息页面
      url: "/pages/GasInformation/GasInformation",
    })
    }
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
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({//个人信息页面
      url: "/pages/PersonalData/PersonalData"
    })
    }
  },
  Supplier() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({//供应商信息页面
      url: "/pages/Supplier/Supplier"
    })
    }
  },
  BindingNumber() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({//绑定用气编号页面
      url: "/pages/BindingNumber/BindingNumber"
    })
    }
  },
  AccountSecurity() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({//账号安全页面
      url: "/pages/AccountSecurity/AccountSecurity"
    })
    }
  },
  Cancellation() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.redirectTo({
      url: '/pages/Login/Login',
    })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("监听页面初次渲染完成")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.CurrentInfo()
    if (app.Customer !== null){
      if (app.Customer.IsMainAccount == true) {
        this.setData({
          state: true
        })
      }
    }
    this.pageLoading = !1;
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