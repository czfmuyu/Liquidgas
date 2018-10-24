let {
  Orderaddress
} = getApp().globalData
var app = getApp().globalData
const baseUrls = app.baseUrl + '/Api/GasOrders/CustomerSubmitOrder' //一键订气上传接口
const utils = require("../../utils/util.js")
let amap = require("../../utils/amap");
// 控制用户连续点击变量
let frequency=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '立即出发',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ], //预定时间弹框
    array2: [
      '今天',
      '明天'
    ],
    index: 0,
    index2: 0,
    showModal: false, //控制地址弹框按钮
    isAddress: false, //控制地址隐藏显示
    showgoods: false, //控制商品弹框隐藏显示
    isgoods: false, //控制商品列表的显示隐藏
    isSupplier: false, //控制供应商隐藏显示
    showPayment: false, //控制支付弹框按钮
    showPaymentMethod: false, //控制支付方式弹框按钮
    goodslist: [{
      Name: "商品1",
      Price: 120,
      Quantity: 0, //计数
      PrceType: "公斤",
    },
    {
      Name: "商品2",
      Price: 120,
      Quantity: 0, //计数
      PrceType: "公斤",
    },
    {
      Name: "商品3",
      Price: 120,
      Quantity: 0, //计数
      PrceType: "瓶",
    },
    {
      Name: "商品4",
      Price: 120,
      Quantity: 0, //计数
      PrceType: "公斤",
    },
    {
      Name: "商品5",
      Price: 120,
      Quantity: 0, //计数
      PrceType: "瓶",
    }
    ],
    goods: [],
    Quantity: 0,
    Price: 0,
    addpayment: {
      name: '在线支付',
      checked: false,
      imgs: "../../imgs/66_03.png",
    },
    radioItems: [ //支付选择
      {
        name: '在线支付',
        checked: false,
        imgs: "../../imgs/66_03.png",
      },
      {
        name: '货到付款',
        checked: true,
        imgs: "../../imgs/66_06.png",
      },
    ],
    PaymentItems: [ //支付方式选择
      {
        name: '微信零钱',
        checked: true
      },
    ],
    OptionsBox: [ //瓶和公斤选择
      {
        name: '瓶',
        checked: true
      },
      {
        name: '公斤',
        checked: false
      }
    ],
    ProductId: "",
    AccountId: "",
    CustomerId: "",
    EnterpriseId: "",
    PaymentName: "",
    EnterpriseName: "",
    EnterprisePhone: "",
    EnterpriseAddress: "",
    EnterpriseProducts: '',
    CustomerName: "",
    CustomerPhone: "",
    CustomerAddress: "",
    CustomerLatitude: "",
    CustomerLongitude: "",
    commodityList: "",
    Times: "",
    day: "",
    OrderItems: ""
  },
  // //供应商重新选择
  // reselectionSupplier() {
  //   wx.navigateTo({
  //     url: "/pages/SupplierRecommend/SupplierRecommend",
  //   })
  // },
  //地址重新选择
  reselection() {
    wx.navigateTo({
      url: '/pages/GasInformation/GasInformation',
    })
    let number = 0;
    wx.setStorage({
      key: 'page',
      data: number,
      success: function (res) {
        // success
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    amap.getRegeo() //用户没有先选地址时获取当前定位
      .then(d => {
        console.log(d)
        let {
          latitude,
          longitude
        } = d[0];
        app.Orderaddress.Latitude = latitude
        app.Orderaddress.Longitude = longitude
      })
      .catch(e => {
        console.log(e);
      })
    this.setData({ //新用户没有值获取填该账户的ID
      AccountId: app.AccountId.AccountId
    })
    this.setData({ //新用户没有值获取填写好的值
      CustomerAddress: Orderaddress.Address,
      CustomerLatitude: Orderaddress.Latitude,
      CustomerLongitude: Orderaddress.Longitude,
      CustomerName: Orderaddress.Contact,
      CustomerPhone: Orderaddress.Phone,
    })
    this.getData()
    this.userData()
  },
  Supplier() {
    console.log(app.CustomerList)
    if (app.CustomerList !== null) {
      let arr = []
      let OptionsBox = this.data.OptionsBox
      if (OptionsBox[0].checked === true || OptionsBox[1].checked === false) {
        console.log("i")
        for (let i = 0; i < app.CustomerList.EnterpriseProducts.length; i++) {
          let obj = {
            Quantity: 0,
            Price: app.CustomerList.EnterpriseProducts[i].UnitPrice,
            ProductName: app.CustomerList.EnterpriseProducts[i].ProductName,
            ProductId: app.CustomerList.EnterpriseProducts[i].ProductId
          }
          arr.push(obj)
        }
        console.log(arr)
        this.setData({
          commodityList: arr
        })
      } else if (OptionsBox[1].checked === true || OptionsBox[0].checked === false) {
        console.log("in")
        for (let j = 0; j < app.CustomerList.EnterpriseProducts.length; j++) {
          let obj = {
            Quantity: 0,
            Price: app.CustomerList.EnterpriseProducts[j].KilogramPrice,
            ProductName: app.CustomerList.EnterpriseProducts[j].ProductName,
            ProductId: app.CustomerList.EnterpriseProducts[j].ProductId
          }
          arr.push(obj)
        }
        console.log(arr)
        this.setData({
          commodityList: arr
        })
      }
      this.setData({
        EnterpriseName: app.CustomerList.Name,
        EnterprisePhone: app.CustomerList.Phone,
        EnterpriseAddress: app.CustomerList.Address,
        EnterpriseProducts: app.CustomerList.EnterpriseProducts,
        EnterpriseId: app.CustomerList.ID,
        ProductId: app.CustomerList.ProductId
      })
      this.userData()
    }
  },
  //用户数据判断
  userData() {
    let CustomerName = this.data.CustomerName
    console.log(CustomerName)
    if (CustomerName == "" || CustomerName == undefined) { //判断地址是否有数据页面切换
      this.setData({
        isAddress: true,
      })
    } else {

      this.setData({
        isAddress: false,
      })
    }
    //判断供应商是否有数据页面切换
    let EnterpriseName = this.data.EnterpriseName
    if (EnterpriseName == "" || EnterpriseName == undefined) {
    console.log(EnterpriseName)
      this.setData({
        isSupplier: true,
      })
    } else {

      this.setData({
        isSupplier: false,
      })
    }
  },
  //取出本地信息方法
  getData() {
    //判断用户选择的是瓶还是公斤
    console.log(app)
    let arr = []
    let OptionsBox = this.data.OptionsBox
    // 判断app是否为null，如果是不执行下面的代码
    if (app.Customer == null) {
      return false
    }
    if (OptionsBox[0].checked === true || OptionsBox[1].checked === false) {
      for (let i = 0; i < app.Customer.CustomerDetails.length; i++) {
        let obj = {
          Quantity: utils.Decrypt(app.Customer.CustomerDetails[i].Quantity),
          Price: utils.Decrypt(app.Customer.CustomerDetails[i].UnitPrice),
          ProductName: utils.Decrypt(app.Customer.CustomerDetails[i].ProductName),
          ProductId: app.Customer.CustomerDetails[i].ProductId
        }
        arr.push(obj)
      }
      this.setData({
        commodityList: arr
      })
    } else if (OptionsBox[1].checked === true || OptionsBox[0].checked === false) {
      for (let j = 0; j < app.Customer.CustomerDetails.length; j++) {
        let obj = {
          Quantity: utils.Decrypt(app.Customer.CustomerDetails[j].Quantity),
          Price: utils.Decrypt(app.Customer.CustomerDetails[j].KilogramPrice),
          ProductName: utils.Decrypt(app.Customer.CustomerDetails[j].ProductName),
          ProductId: app.Customer.CustomerDetails[j].ProductId
        }
        arr.push(obj)
      }
      this.setData({
        commodityList: arr
      })
    }
    if (app.Orderaddress.Contact == "") {
      this.setData({
        CustomerName: utils.Decrypt(app.Customer.CustomerName),
        CustomerPhone: utils.Decrypt(app.Customer.CustomerPhone),
        CustomerAddress: utils.Decrypt(app.Customer.CustomerAddress),
        CustomerLatitude: app.Customer.CustomerLatitude,
        CustomerLongitude: app.Customer.CustomerLongitude,
        EnterpriseName: app.Customer.EnterpriseName,
        EnterprisePhone: app.Customer.EnterprisePhone[0],
        EnterpriseAddress: app.Customer.EnterpriseAddress,
        CustomerId: app.Customer.CustomerId,
        EnterpriseId: app.Customer.EnterpriseId,
        AccountId: app.Customer.AccountId,
      })
    } else {
      this.setData({
        EnterpriseName: app.Customer.EnterpriseName,
        EnterprisePhone: app.Customer.EnterprisePhone[0],
        EnterpriseAddress: app.Customer.EnterpriseAddress,
        CustomerId: app.Customer.CustomerId,
        EnterpriseId: app.Customer.EnterpriseId,
        AccountId: app.Customer.AccountId,
      })
    }
    this.userData()
  },
  //瓶和公斤选项框点击事件
  OptionsBox: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.OptionsBox.length; i++) {
      if (checked.indexOf(this.data.OptionsBox[i].name) !== -1) {
        changed['OptionsBox[' + i + '].checked'] = true
      } else {
        changed['OptionsBox[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
    this.getData()
    this.Supplier()
  },
  //供应商点击跳转供应商列表
  SupplierAdd() {
    wx.navigateTo({
      url: "/pages/SupplierRecommend/SupplierRecommend",
    })
  },
  // 判断用户连续点击多次
  Submission(){
    if (frequency==0){
      frequency++
      this.ConfirmSuccess()
    }
  },


  //确定支付点击事件
  ConfirmSuccess() {
    let this_ = this
    let OptionsBox = this_.data.OptionsBox
    let PrceType
    let SubscribeTime
    if (OptionsBox[0].checked === true) { //购买模式判断
      PrceType = 0
    } else if (OptionsBox[1].checked === true) {
      PrceType = 10
    };
    let array = this_.data.array
    let time = "";
    if (array[this_.data.index] === "立即出发") { //预约时间判断
      time = 0
      SubscribeTime = ""
    } else if (array[this_.data.index] !== "立即出发") {
      time = 10
      let Times = utils.formatTime1(new Date());
      let day = Times.slice(0, 10)
      SubscribeTime = day + " " + this_.data.array[this_.data.index]
      console.log(SubscribeTime)
    };
    let PayMethod = this_.data.radioItems
    let payment
    if (PayMethod[0].checked === true) {
      if (PayMethod.length == 1) {
        payment = 100
      } else {
        payment = 0
      }
    } else if (PayMethod[1].checked === true) {
      payment = 100
    }
    let commodityList = this_.data.commodityList
    let array1 = [];
    if (OptionsBox[0].checked === true) { //瓶
      for (let k = 0; k < commodityList.length; k++) {
        if (commodityList[k].Quantity > 0) {
          let OrderItems = {
            Price: utils.Encryption(commodityList[k].Price),
            Quantity: utils.Encryption(commodityList[k].Quantity),
            ProductId: utils.Encryption(commodityList[k].ProductId),
            Kilogram: 0
          }
          array1.push(OrderItems)
          this_.setData({
            OrderItems: array1
          })
        }
      }
    } else if (OptionsBox[1].checked === true) {
      for (let l = 0; l < commodityList.length; l++) {
        if (commodityList[l].Quantity > 0) {
          let OrderItems = {
            Price: utils.Encryption(commodityList[l].Price),
            Quantity: utils.Encryption(commodityList[l].Quantity),
            ProductId: utils.Encryption(commodityList[l].ProductId),
            Kilogram: 0
          }
          array1.push(OrderItems)
          this_.setData({
            OrderItems: array1
          })
        }
      }
    }
    console.log(this_.data.OrderItems)
    console.log(app)
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        EnterpriseId: this_.data.EnterpriseId,
        CustomerId: this_.data.CustomerId,
        Price: utils.Encryption(this_.data.Price),
        Quantity: utils.Encryption(this_.data.Quantity),
        Contact: utils.Encryption(this_.data.CustomerName),
        Phone: utils.Encryption(this_.data.CustomerPhone),
        Address: utils.Encryption(this_.data.CustomerAddress),
        Longitude: this_.data.CustomerLongitude,
        Latitude: this_.data.CustomerLatitude,
        GasBuyMode: PrceType,
        DistributionMode: time,
        SubscribeTime: SubscribeTime,
        PayMethod: payment,
        AccountId: app.AccountId.AccountId,
        OrderItems: this_.data.OrderItems,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // 判断用户点击重新赋值
        console.log("提交过")
        frequency=0
        console.log(res.data)
        if (res.data.Code == 506) {
          wx.showToast({
            title: '请输入完整的信息',
            icon: 'none',
            duration: 2000
          });
        } else {
          app.CustomerId = res.data.Data.CustomerId
          wx.switchTab({
            url: "/pages/Order/Order",
          })
        }
      },
    })

  },

  /**
   * 支付方式弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 支付方式隐藏模态对话框
   */
  PaymentMethodhideModal: function () {
    this.setData({
      showPaymentMethod: false
    });
  },
  /**
   * 支付方式对话框取消按钮点击事件
   */
  PaymentMethodCancel: function () {
    this.PaymentMethodhideModal();
  },
  /**
   * 支付方式对话框确认按钮点击事件
   */
  PaymentMethodConfirm: function (e) {
    this.PaymentMethodhideModal();
  },

  //支付方式选项框点击事件
  PaymentChange(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.PaymentItems.length; i++) {
      if (checked.indexOf(this.data.PaymentItems[i].name) !== -1) {
        changed['PaymentItems[' + i + '].checked'] = true
      } else {
        changed['PaymentItems[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
  },
  //支付选项框点击事件
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
  },
  /**
   * 支付弹出框点击事件事件
   */
  goodsPayment() {
    this.setData({
      showPayment: true
    });
  },
  /**
   * 支付弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 支付隐藏模态对话框
   */
  PaymenthideModal: function () {
    this.setData({
      showPayment: false
    });
  },
  /**
   * 支付对话框取消按钮点击事件
   */
  PaymentCancel: function () {
    this.PaymenthideModal();
  },
  /**
   * 支付对话框确认按钮点击事件
   */
  PaymentConfirm: function (e) {
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (this.data.radioItems[i].checked === true) {
        this.setData({
          PaymentName: this.data.radioItems[i].name
        })
        if (this.data.radioItems[i].name === "在线支付") {
          this.setData({
            showPaymentMethod: true
          });
        }
      }
    }
    this.PaymenthideModal();
  },



  /**
   * 商品弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 商品隐藏模态对话框
   */
  goodsHideModal: function () {
    this.setData({
      showgoods: false
    });
  },
  /**
   * 商品对话框取消按钮点击事件
   */
  goodsCancel: function () {
    this.goodsHideModal();
  },
  /**
   * 商品对话框确认按钮点击事件
   */
  goodsConfirm: function () {
    let commodityList = this.data.commodityList;
    let goods = [];
    for (let i = 0; i < commodityList.length; i++) {
      if (commodityList[i].Quantity > 0) {
        goods.push(commodityList[i])
      }
    }
    let radio = this.data.radioItems;
    console.log(radio.length)
    let OptionsBox = this.data.OptionsBox
    let addpayment = this.data.addpayment
    if (OptionsBox[1].checked === true && OptionsBox[0].checked === false) {
      if (radio.length == 2) {
        radio.splice(0, 1);
        this.setData({
          radioItems: radio,
        })
      }
    } else if (OptionsBox[0].checked === true && OptionsBox[1].checked === false) {
      if (radio.length == 1) {
        radio.unshift(addpayment);
        this.setData({
          radioItems: radio,
        })
      }
    }
    this.setData({
      isgoods: true,
      goods: goods
    })
    this.goodsHideModal();
  },
  /**
   * 商品点击显示弹框
   */
  goodsDisplay() {
    this.setData({
      showgoods: true,
    })
  },
  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
    const index = e.target.dataset.index;
    const commodityList = this.data.commodityList;
    const Quantity = commodityList[index].Quantity;
    if (Quantity <= 0) {
      return;
    } else {
      commodityList[index].Quantity--;
      this.setData({
        commodityList: commodityList
      });
    }
    this.calculateTotal();
  },
  /**
   * 用户点击商品加1
   */
  addtap: function (e) {
    const index = e.target.dataset.index;
    const commodityList = this.data.commodityList;
    const Quantity = commodityList[index].Quantity;
    commodityList[index].Quantity++;
    this.setData({
      commodityList: commodityList
    });
    this.calculateTotal();
  },
  /**
   * 计算商品总数
   */
  calculateTotal: function () {
    let commodityList = this.data.commodityList;
    let Count = 0;
    let Price = 0;
    let OptionsBox = this.data.OptionsBox
    if (OptionsBox[0].checked === true || OptionsBox[1].checked === false) { //瓶
      for (let i = 0; i < commodityList.length; i++) {
        let good = commodityList[i];
        Count += parseInt(good.Quantity);
        Price += good.Quantity * good.Price;
      }
      this.setData({
        Quantity: Count,
        Price: Price
      })
    } else { //公斤
      for (let i = 0; i < commodityList.length; i++) {
        let good = commodityList[i];
        Count += parseInt(good.Quantity);
        Price += good.Quantity * good.Price;
      }
      this.setData({
        Quantity: Count,
        Price: 0
      })
    }
  },
  //预约时间Picker索引值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //预约那天Picker索引值
  bindDayPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },


  /**
   * 地址弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 地址隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 地址对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },

  userName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  userPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  userAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  /**
   * 地址对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    //地址判断
    let name = this.data.name
    if (name === "") {
      this.setData({
        isAddress: true,
      })
    } else {
      this.setData({
        isAddress: false,
      })
    }
    this.hideModal();

  },
  /**
   * 地址无数据隐藏页面弹框
   */
  Addaddress() {
    wx.navigateTo({
      url: '/pages/GasInformation/GasInformation',
    })
    let number = 0;
    wx.setStorage({
      key: 'page',
      data: number,
      success: function (res) {
        // success
      },
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateTotal();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Supplier()
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