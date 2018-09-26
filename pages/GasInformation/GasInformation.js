
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
    this.getData()
    this.page()
    if (options.length>1){
      let longitudes = options.longitudes
      let latitudes = options.latitudes
      let address = options.locations
      this.setData({
        address: address,
        longitudes: longitudes,
        latitudes: latitudes,
      })
    }else{
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
  //获取本地储存
  getData() {
    let _this = this
    wx.getStorage({
      key: 'Information',
      success: function (res) {
        let storename = res.data.AccountName
        let telephone = res.data.AccountPhone
        let address = res.data.CustomerAddress
        _this.setData({
          storename: storename,
          telephone: telephone,
          address: address,
        })
      },
    })
  },
  // 提交地址
  submission() {
    let indexs = this.data.index
    let name = this.data.storename
    let phone = this.data.telephone
    let longitudes = this.data.longitudes
    let latitudes = this.data.latitudes
    let address = this.data.address
    // 本地储存
    wx.setStorage({
      key: 'address',
      data: {
        longitudes,
        latitudes,
        address,
        phone,
        name
      },
    })
    if (indexs == 0) {
      console.log("in")
      wx.navigateTo({
        url: '/pages/OrderAddress/OrderAddress',
      })
    } else {
      console.log("i")
      wx.switchTab({
        url: '/pages/My/My',
      })
    }
  },
  // 获取姓名
  GasNumber: function (e) {
    let value = e.detail.value
    this.setData({
      storename: value
    })
  },
  // 获取电话
  GasNumbers: function (e) {
    let value = e.detail.value
    this.setData({
      telephone: value
    })
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
   * 电话弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 电话隐藏模态对话框
   */
  PhoneHideModal: function () {
    this.setData({
      PhoneShowModal: false
    });
  },
  /**
   * 电话对话框取消按钮点击事件
   */
  onPhoneCancel: function () {
    this.PhoneHideModal();
  },
  /**
   * 电话对话框确认按钮点击事件
   */
  onPhoneConfirm: function () {
    this.PhoneHideModal();
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
   * 名称隐藏模态对话框
   */
  NameHideModal: function () {
    this.setData({
      NameShowModal: false
    });
  },
  /**
   * 名称对话框取消按钮点击事件
   */
  onNameCancel: function () {
    this.NameHideModal();
  },
  /**
   * 名称对话框确认按钮点击事件
   */
  onNameConfirm: function () {
    this.NameHideModal();
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