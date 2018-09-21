// pages/Login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tick:""
  
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
  //登录点击事件
  Login(){
    wx.switchTab({//主页面
      url: '/pages/HomePage/HomePage'
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