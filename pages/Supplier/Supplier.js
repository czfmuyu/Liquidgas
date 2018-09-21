// pages/Supplier/Supplier.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShowModal: false,//弹框按钮操控
    phoneList: [
      {
        phone: '15355458975'
      },
      {
        phone: '13355458975'
      },
      {
        phone: '18355458975'
      },
    ]
  },
  //弹框电话选择
  onList(e) {
    var index = e.target.dataset.index;
    wx.makePhoneCall({
      phoneNumber: this.data.phoneList[index].phone,
      success(res) {
        console.log("拨打电话成功")
      },
      fail(){
        console.log("拨打电话失败")
      }
    })
  },
  /**
     * 联系电话弹窗
     */
  phoneList() {
    this.setData({
      ShowModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
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
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.HideModal();
  },
  //更换供应商点击事件
  Replace() {//
    wx.navigateTo({//供应商推荐页面
      url: "/pages/SupplierRecommend/SupplierRecommend"
    })
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