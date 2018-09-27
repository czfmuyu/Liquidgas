const { baseUrl, Orderaddress,CustomerList } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Enterprises/GetEnterpriseDistance`//获取位置对应距离最近企业信息接口
const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,//弹框按钮操控
    Suppliers: [],
    TotalCount: 5,//返回数据条数
    index: "",
  },
  /**
    * 弹窗
    */
  SupplierDialogBtn(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      showModal: true,
      index: e.currentTarget.dataset.index
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
  onConfirm () {
    wx.setStorageSync('Suppliers', this.data.Suppliers[this.data.index])
    this.hideModal();
    wx.navigateTo({
      url: '/pages/OrderAddress/OrderAddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSupplierInfo()
  },
  getSupplierInfo() {
    let this_ = this;
    let {Longitude,Latitude } = Orderaddress;
    let TotalCount = this.data.TotalCount;
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        TotalCount: TotalCount,
        MyLatitude: Latitude,
        MyLongitude: Longitude,
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data.Data)
        let data = res.data.Data
        for (let i = 0; i < data.length; i++) {
          let Distance = Math.round(data[i].Distance)
          data[i].Distance = Distance
        }
        this_.setData({
          Suppliers: data
        })
      }
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