//app.js
App({
 
  onLaunch: function () {
    // var that = this;
    // wx.login({
    //   success: res => {
    //     wx.request({
    //       url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
    //       success: res => {
    //         that.globalData.openid = res.data.openid;
    //       }
    //     })
    //   }
    // });
  },
  globalData: {
    baseUrl: "http://192.168.0.66:2599",
    AccountId:"",
    CustomerId:"",
    Customer:null,//个人信息
    CustomerList:null,//商品列表
    Subaccount:null,//子账号信息
    GasNo:"",//用户所有用气编号
    Orderaddress: { Contact: "", Phone: "", Address: "", Longitude: "", Latitude:""},//地址信息
    Latitude: null,
    Longitude: null,
    ServiceUserId:null,
    EnterpriseId:null,
    // Address:null,
    GasState: true,//是否绑定用气编号状态
  }
})