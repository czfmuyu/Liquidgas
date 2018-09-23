const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/GetAccountCustomers`//获取个人数据接口
// pages/HomePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    newuser: true,
    showModalTwo: false,
    user: true,
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
   this.Tips()
  },
  //获取AccountId本地储存并获取个人数据
  ObtainStorage(){
    wx.getStorage({
      key: 'AccountId',
      success:res=>{
        console.log(res.data.AccountId)
        wx.request({//获取个人信息请求
          url: baseUrls,
          data: {
            Sign:"",
            AccountId:res.data.AccountId,
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log(res)
            wx.setStorage({//个人信息存本地
              key: '个人信息',
              data:res.data.Data,
              success: function(res){
              },
            })
          },
        })
      }
    })
  },
  Tips(){
    let newuser = this.data.newuser
    let user = this.data.user
    if (newuser === false) {
      this.setData({
        showModal: true
      })
    }else if(newuser === true && user === false) {
      this.setData({
        showModalTwo: true
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
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModalTwo();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModalTwo();
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