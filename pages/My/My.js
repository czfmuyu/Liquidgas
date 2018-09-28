const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/GetAccountCustomers`//获取个人数据接口
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
    state:false
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    // 判断是否是子帐号显示页面true主帐号页面,false子帐号页面
    if (app.Customer.IsMainAccount==true){
      this.setData({
        state:true
      })
    }
    if (app.Customer.GasNo === null) {
      this.setData({
        Gas: "无用气编号请联系服务商添加用气编号"
      })
    }else{
      this.setData({
        Gas: app.Customer.GasNo
      })
    }
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