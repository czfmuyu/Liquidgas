const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Common/InsertEvaluate`//添加一条评价信息接口
const EvaluateUrl= `${baseUrl}/Api/Common/GetEvaluateByObjectId`//判断这条信息是否评价过
// const getEva =`${baseUrl}/Api/Common/GetEvaluateById`//获取一条评价信息接口
let app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:"",
    inpt: "",
    star: 0,
    star1: 0,
    star2: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
  },

  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  },
  myStarChoose1(e) {
    let star1 = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star1: star1,
    });
  },
  myStarChoose2(e) {
    let star2 = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star2: star2,
    });
  },
  // 获取tetx里面的值
  changeOrderData: function (e) {
    let text = e.detail.value
    this.setData({
      inpt: text
    })
  },
  // 提交表单

  submission: function () {
    console.log(this.data.inpt)
    console.log(this.data.star)
    wx.request({
      url: baseUrls,
      data: {
        Sign: "aa",
        ObjectId: app.AccountId.AccountId,
        Type: 10,
        Score: this.data.star,
        CustomerId: app.Customer.CustomerId,
        Content: this.data.inpt
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.Code == 200) {
          wx.switchTab({
            url: "/pages/Order/Order"
          })
        }
      },
    })
  },
  // 查看是否评价
  evaluate(id){
    wx.request({
      url: EvaluateUrl,
      data: {
       Sign:"0",
       Objectld:id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("sssss")
        console.log(res)
        // this.setData({
        //   disabled: "disabled"
        // })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     this.evaluate(options.id)
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