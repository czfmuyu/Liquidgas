const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Login/AccountLogin`//登录接口
const utils=require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tick:"",
    Phone:"",
    Password:""
  },
  userName(e){
    console.log(e.detail.value)
    this.setData({
      Phone:e.detail.value
    })
  },
  password(e){
    this.setData({
      Password:e.detail.value
    })
  },
  //登录点击事件
  onLogin(){
    let Phone=this.data.Phone
    let Password=this.data.Password
    console.log(Phone,Password)
    console.log("in")
    wx.request({
      url: baseUrls,
      data: {
        Sign:"",
        Phone:utils.Encryption(Phone),
        Password:utils.Encryption(Password)
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function(res){
        console.log(res)
        console.log(res.data.Code)
        console.log(res.data.Msg)
        console.log(res.data.Data)
        if(res.data.Code==200){
          wx.setStorage({
            key: 'AccountId',
            data: utils.Decrypt(res.data.Data),
            success: () => {
              wx.switchTab({
                url: '/pages/HomePage/HomePage'
              })
            }
          });
        }else{
          wx.showToast({
            title: res.data.Msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
    })
  },
  //点击记住密码打钩事件
  Tick(){
    let T=this.data.Tick
    if(T==="√"){
      this.setData({
        Tick:""
      })
    }else{
      this.setData({
        Tick:"√"
      })
    }
  },
  //找回密码点击事件
  RetrievePassword(){
    wx.navigateTo({//找回密码页面
      url: "/pages/RetrievePassword/RetrievePassword"
    })
  },
  //注册点击事件
  Register(){
    wx.navigateTo({//注册密码页面
      url: "/pages/Register/Register"
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