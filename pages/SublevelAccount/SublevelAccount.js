let app=getApp()
const baseUrl = app.globalData.baseUrl
//获取字帐号
const account = `${baseUrl}/Api/Customers/GetCustomerAccounts`
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 判断提示语是否显示
    display:"",
   listing:"",

  },/**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
   let _this=this
   wx.request({
     url: account,
     data: {
       Sign: "",
       CustomerId: app.globalData.AccountId.AccountId
     },
     header: {
       'content-type': 'application/json'
     },
     method: 'POST',
     success: res => {
       let account=res.data.Data
       console.log(res)
       if (account.length<=0){
         _this.setData({
           display:"1"
         })
       }else{
        let list=res.data.Data
        _this.setData({
          listing:list
        })
       }
     },
   })
 },

// 删除指帐号
  delet:function(){
    console.log(app.globalData.CustomerId.AccountId)
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