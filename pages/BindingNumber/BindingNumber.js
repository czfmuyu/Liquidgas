let app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GasShowModal: false, //弹框按钮操控
    numberlist: [],
    numbers: "",
  },
  /**
   * 名字弹窗
   */
  Gas() {
    this.setData({
      GasShowModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  GasHideModal: function() {
    this.setData({
      GasShowModal: false,
      numbers: ""
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onGasCancel: function() {
    this.GasHideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onGasConfirm: function() {
    let _this = this
    let numberlists = _this.data.numberlist
    numberlists.push(_this.data.numbers)
    _this.setData({
      numberlist: numberlists,
      GasShowModal: false
    })
    // wx.redirectTo({
    //   url: '/pages/Authorized/Authorized',
    // })

  },
  // 获取新增编号
  GasNumber: function(e) {
    let _this = this
    let text = e.detail.value
    let gasuses = []
    gasuses.push(text)
    _this.setData({
      numbers: gasuses
    })

  },

  // 获取本地储存用气编号
  gasuse: function() {
    console.log(app.GasNo)
    // let gasuses = []
    // if (res.data.length > 0) {
    //   for (let i = 0; i < res.data.length; i++) {
    //     gasuses.push(res.data[i].GasNo)
    //   }
    // } else {
    //   gasuse = res.data.GasNo
    //   gasuses.push(gasuse)
    // }
    this.setData({
      numberlist: app.GasNo
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.gasuse()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})