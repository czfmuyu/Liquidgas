const {
  baseUrl
} = getApp().globalData
const baseUrls = `${baseUrl}/Api/Customers/GetCustomerInfo` //获取当前信息接口
let app = getApp().globalData

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用气编号
    index: 0,
    Gas: "",
    // 子帐号页面显示与影藏
    state: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 判断用户是否选择用气编号,如果没有跳会首页
    // console.log(app.GasNo.length)
    // console.log(app.Customer.length)
    // if (app.GasNo.length > 1 && app.Customer.length > 1) {
    //   wx.switchTab({
    //     url: '/pages/HomePage/HomePage'
    //   })
    // }else{
    //   this.CurrentInfo()
    // }
  },
  CurrentInfo() {
    let this_ = this
    if (app.CustomerId !== "") {
      // this_.setData({
      //   Gas: app.Customer.GasNo
      // })
      console.log("查询信息")
      wx.request({
        url: baseUrls,
        data: {
          Sign: "",
          AccountId: app.AccountId.AccountId,
          CustomerId: app.CustomerId
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res) {
          console.log(res.data.Data)
          app.Customer = res.data.Data
          this_.setData({
            Gas: res.data.Data.GasNo
          })
        },
      })
    } 
    // else {
    //   // this_.setData({
    //   //   Gas: app.Customer.GasNo
    //   // })
    // }
  },
  SublevelAccount() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({ //子账号页面
        url: "/pages/SublevelAccount/SublevelAccount"
      })
    }
  },
  GasInformation() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({ //用气信息页面
        url: "/pages/GasInformation/GasInformation",
      })
    }
    let number = 1;
    wx.setStorage({
      key: 'page',
      data: number,
      success: function(res) {
        // success
      },
    })
  },
  PersonalData() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({ //个人信息页面
        url: "/pages/PersonalData/PersonalData"
      })
    }
  },
  Supplier() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({ //供应商信息页面
        url: "/pages/Supplier/Supplier"
      })
    }
  },
  AddGesNum() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({ //绑定用气编号页面
        url: "/pages/BindingNumber/BindingNumber"
      })
    }
  },
  BindingNumber() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({ //绑定用气编号页面
        url: "/pages/BindingNumber/BindingNumber"
      })
    }
  },
  AccountSecurity() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({ //账号安全页面
        url: "/pages/AccountSecurity/AccountSecurity"
      })
    }
  },
  Cancellation() {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      // getApp().globalData = {
      //   AccountId: "",
      //   CustomerId: "",
      //   Customer: null,
      //   CustomerList: null,
      //   Subaccount: null,
      //   GasNo: "",
      //   Orderaddress: {
      //     Contact: "",
      //     Phone: "",
      //     Address: "",
      //     Longitude: "",
      //     Latitude: ""
      //   }
      // }
      // 循环将对象赋值为空
      let obj = app.Orderaddress
      console.log(obj)
      for (let key in obj) {
        obj[key] = ''
      }
      for (let key in app) {
        app[key] = ''
      }
      app.Orderaddress = obj
      wx.reLaunch({
        url: '/pages/Login/Login',
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("监听页面初次渲染完成")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.GasNo.length > 1 && app.Customer.length > 1) {
      wx.switchTab({
        url: '/pages/HomePage/HomePage'
      })
    } else {
      this.CurrentInfo()
    }
    if (app.Customer !== null) {
      if (app.Customer.IsMainAccount == true) {
        this.setData({
          state: true
        })
      }
    }
    this.pageLoading = !1;

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log(app)
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