const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/UpdateAccountInfo`//更新账户信息接口
let app = getApp().globalData
const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NameShowModal: false, //弹框按钮操控
    AccountName: "",
    AccountPhone: "",
    // 修改的名字
    modifyname: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  //获取本地储存
  getData() {
    let this_ = this
    this_.setData({
      AccountName: utils.Decrypt(app.Customer.AccountName),
      AccountPhone: utils.Decrypt(app.Customer.AccountPhone)
    })
  },
  GasNumber: function(e) {
    this.setData({
      modifyname: e.detail.value
    })
  },
  /**
   * 名字弹窗
   */
  ReplaceName() {
    this.setData({
      NameShowModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  NameHideModal: function() {
    this.setData({
      NameShowModal: false,
      modifyname: ""
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onNameCancel: function() {
    this.setData({
      NameShowModal: false,
      modifyname: ""
    });

  },
  /**
   * 对话框确认按钮点击事件
   */
  onNameConfirm() {
    let name = /^[\u4E00-\u9FA5A-Za-z]{2,18}$/;
    if (!name.test(this.data.modifyname)) {
      wx.showToast({
        title: "姓名输入有误！",
        icon: 'loading',
        duration: 1000
      });
    } else {
      this.setData({
        AccountName: this.data.modifyname,
        NameShowModal: false
      });
      app.Customer.AccountName = this.data.modifyname
      wx.request({
        url: baseUrls,
        data: {
          Sign:"",
          AccountId:app.AccountId.AccountId,
          Name:this.data.modifyname,
          Phone:this.data.AccountPhone
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          console.log(res)
        },
      })
    }

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
    this.getData()
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