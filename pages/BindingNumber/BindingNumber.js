let app = getApp().globalData
const baseUrls = `${app.baseUrl}/Api/Customers/BindCustomerAccount`

var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    GasShowModal: false, //弹框按钮操控
    numberlist: "",
    numbers: "",
    // 企业唯一id
    AccountId: "",
  },
  /**
   * 名字弹窗
   */
  Gas() {
    this.setData({
      GasShowModal: true
    })
  },

  /**
   * 隐藏模态对话框
   */
  GasHideModal: function() {
    this.setData({
      GasShowModal: false,
      numbers: ""
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onGasCancel: function() {
    this.GasHideModal();
  },
  /**
   * 对话框确认按钮点击事件上传获取到的用气编号
   */
  onGasConfirm: function() {
    this.setData({
      GasShowModal: false
    })
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        GasNo: this.data.numbers,
        AccountId: app.AccountId.AccountId
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: res => {
        console.log(res)
        if (res.data.Code == 200) {
          getApp().globalData = {
            AccountId: "",
            CustomerId: "",
            Customer: null,
            CustomerList: null,
            Subaccount: null,
            GasNo: "",
            Orderaddress: { Contact: "", Phone: "", Address: "", Longitude: "", Latitude: "" }
          }
          console.log(app)
          wx.reLaunch({
            url: '/pages/Login/Login',
          })
        }else{
          util.showError(res.data.Msg)
        }
      }
    })


  },
  // 获取新增编号
  GasNumber: function(e) {
    let text = e.detail.value
    this.setData({
      numbers: text
    })

  },

  // 获取本地储存用气编号
  gasuse: function() {
    // let gasn = [["1234456"],["无用气编号请联系服务商添加用气编号"],["748758457"],["45565465"]]
    let gasn = app.GasNo

    let gasuses = []
    for (let i = 0; gasn.length > i; i++) {
      if (gasn[i] !== "无用气编号请联系服务商添加用气编号") {
        console.log("qqq")
        gasuses.push(gasn[i])
      }
    }
    this.setData({
      numberlist: gasuses,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.gasuse()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

})


// let gasuses = []
// if (res.data.length > 0) {
//   for (let i = 0; i < res.data.length; i++) {
//     gasuses.push(res.data[i].GasNo)
//   }
// } else {
//   gasuse = res.data.GasNo
//   gasuses.push(gasuse)
// }