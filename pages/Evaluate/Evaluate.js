const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/Common/InsertEvaluate`//添加一条评价信息接口
const EvaluateUrl = `${baseUrl}/Api/Common/GetEvaluateByObjectId`//判断这条信息是否评价过
// const getEva =`${baseUrl}/Api/Common/GetEvaluateById`//获取一条评价信息接口Api/Common/GetEvaluateByObjectId
let app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断跳回维修还是订单
    index:"",
    objectId: "",
    disabled: "",
    HiddenBtn:true,
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

  // myStarChoose(e) {
  //   let star = parseInt(e.target.dataset.star) || 0;
  //   console.log(star)
  //   this.setData({
  //     star: star,
  //   });
  // },
  myStarChoose1(e) {
    let star1 = parseInt(e.target.dataset.star) || 0;
    console.log(star1)
    this.setData({
      star1: star1,
    });
  },
  // myStarChoose2(e) {
  //   let star2 = parseInt(e.target.dataset.star) || 0;
  //   console.log(star2)
  //   this.setData({
  //     star2: star2,
  //   });
  // },
  // 获取tetx里面的值
  changeOrderData: function (e) {
    let text = e.detail.value
    this.setData({
      inpt: text
    })
  },
  // 提交表单
  submission: function () {
   let _this=this
    wx.request({
      url: baseUrls,
      data: {
        Sign: "aa",
        ObjectId: _this.data.objectId,
        Type: 10,
        Score: _this.data.star1,
        CustomerId: app.Customer.CustomerId,
        Content: _this.data.inpt
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.Code == 200) {
          if (_this.data.index==1){
            wx.switchTab({
              url: "/pages/Order/Order"
            })
          }else{
            wx.switchTab({
              url: "/pages/RepairOrder/RepairOrder"
            })
          }
        }
      },
    })
  },
  // 查看是否评价
  evaluate(id) {
    let this_ = this
    wx.request({
      url: EvaluateUrl,
      data: {
        Sign: "0",
        objectId: id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        if (res.data.Data.length == 1) {
          this_.setData({
            inpt: res.data.Data[0].Content,
            star1: res.data.Data[0].Score,
            HiddenBtn:false
          })
          
        }
        // this.setData({
        //   disabled: "disabled"
        // })inpt
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      objectId: options.id,
      index: options.index,
    })
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