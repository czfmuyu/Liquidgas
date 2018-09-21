// pages/GasInformation/GasInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NameShowModal: false,//名称弹框控制
    PhoneShowModal: false,//电话弹框控制
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
  preventTouchMove: function () {
  },
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
  preventTouchMove: function () {
  },
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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