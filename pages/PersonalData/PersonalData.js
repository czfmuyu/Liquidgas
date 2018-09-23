
const utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NameShowModal: false,//弹框按钮操控
    AccountName:"",
    AccountPhone:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  //获取本地储存
  getData(){
    let this_=this
    wx.getStorage({
      key: 'Information',
      success: function(res){
        console.log(res.data)
        this_.setData({
          AccountName:utils.Decrypt(res.data[0].AccountName),
          AccountPhone:utils.Decrypt(res.data[0].AccountPhone)
        })
      },
    })
  },

  /**
     * 名字弹窗
     */
  ReplaceName () {
    this.setData({
      NameShowModal: true
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
  NameHideModal: function () {
    this.setData({
      NameShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onNameCancel: function () {
    this.NameHideModal();
  },
  /**
   * 对话框确认按钮点击事件
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