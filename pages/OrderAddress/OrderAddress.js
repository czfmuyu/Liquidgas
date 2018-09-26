const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/GasOrders/NewGasOrder`//一键订气上传接口
const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '立即出发',
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ],//预定时间弹框
    array2:
      [
        '今天',
        '明天'
      ],
    index: 0,
    index2: 0,
    showModal: false,//控制地址弹框按钮
    isAddress: false,//控制地址隐藏显示
    showgoods: false,//控制商品弹框隐藏显示
    isgoods: false,//控制商品列表的显示隐藏
    isSupplier: false,//控制供应商隐藏显示
    showPayment: false,//控制支付弹框按钮
    showPaymentMethod: false,//控制支付方式弹框按钮
    goodslist: [
      {
        Name: "商品1",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品2",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品3",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      },
      {
        Name: "商品4",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品5",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      }
    ],
    goods: [],
    Quantity: 0,
    Price: 0,
    addpayment: { name: '在线支付', checked: false, imgs: "../../imgs/66_03.png", },
    radioItems: [//支付选择
      { name: '在线支付', checked: false, imgs: "../../imgs/66_03.png", },
      { name: '货到付款', checked: true, imgs: "../../imgs/66_06.png", },
    ],
    PaymentItems: [//支付方式选择
      { name: '微信零钱', checked: true },
    ],
    OptionsBox: [//瓶和公斤选择
      { name: '瓶', checked: true },
      { name: '公斤', checked: false }
    ],
    ProductId: "",
    AccountId: "",
    CustomerId: "",
    EnterpriseId: "",
    PaymentName: "",
    EnterpriseName: "",
    EnterprisePhone: "",
    EnterpriseAddress: "",
    EnterpriseProducts:'',
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
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad() {
    let data = wx.getStorageSync('address')
    this.setData({
      CustomerAddress: data.address,
      CustomerLatitude: data.latitudes,
      CustomerLongitude: data.longitude,
      CustomerName: data.name,
      CustomerPhone: data.phone,
    })
    let Supplier = wx.getStorageSync('Supplier')
    this.setData({
      EnterpriseName: Supplier.Name,
      EnterprisePhone: Supplier.Phone,
      EnterpriseAddress: Supplier.Address,
    })
    this.getData()
    this.userData()
  },
  //用户数据判断
  userData() {
    let CustomerName = this.data.CustomerName
    console.log(CustomerName)
    if (CustomerName == "" || CustomerName == undefined) {//判断地址是否有数据页面切换
     
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
    console.log(EnterpriseName)
    if (EnterpriseName == "" || EnterpriseName == undefined) {
     
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
    let this_ = this
    wx.getStorage({
      key: 'Information',
      success: function (res) {
        //判断用户选择的是瓶还是公斤
        let arr = []
        let OptionsBox = this_.data.OptionsBox
        if (OptionsBox[0].checked === true || OptionsBox[1].checked === false) {
          for (let i = 0; i < res.data.CustomerDetails.length; i++) {
            let obj = {
              Quantity: utils.Decrypt(res.data.CustomerDetails[i].Quantity),
              Price: utils.Decrypt(res.data.CustomerDetails[i].UnitPrice),
              ProductName: utils.Decrypt(res.data.CustomerDetails[i].ProductName),
              ProductId: res.data.CustomerDetails[i].ProductId
            }
            arr.push(obj)
          }
          this_.setData({
            commodityList: arr
          })
        } else if (OptionsBox[1].checked === true || OptionsBox[0].checked === false) {
          for (let i = 0; i < res.data.CustomerDetails.length; i++) {
            let obj = {
              Quantity: utils.Decrypt(res.data.CustomerDetails[i].Quantity),
              Price: utils.Decrypt(res.data.CustomerDetails[i].KilogramPrice),
              ProductName: utils.Decrypt(res.data.CustomerDetails[i].ProductName),
              ProductId: res.data.CustomerDetails[i].ProductId
            }
            arr.push(obj)
          }
          this_.setData({
            commodityList: arr
          })
        }
        this_.setData({
          CustomerName: utils.Decrypt(res.data.CustomerName),
          CustomerPhone: utils.Decrypt(res.data.CustomerPhone),
          CustomerAddress: utils.Decrypt(res.data.CustomerAddress),
          EnterpriseName: res.data.EnterpriseName,
          EnterprisePhone: res.data.EnterprisePhone[0],
          EnterpriseAddress: res.data.EnterpriseAddress,
          CustomerId: res.data.CustomerId,
          EnterpriseId: res.data.EnterpriseId,
          CustomerLatitude: res.data.CustomerLatitude,
          CustomerLongitude: res.data.CustomerLongitude,
          AccountId: res.data.AccountId,
        })
        this_.userData()
      },
    })

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
  },
  //供应商点击跳转供应商列表
  SupplierAdd() {
    wx.navigateTo({
      url: "/pages/SupplierRecommend/SupplierRecommend",
    })
  },

  //确定支付点击事件
  ConfirmSuccess() {
    let OptionsBox = this.data.OptionsBox
    let PrceType
    let SubscribeTime
    if (OptionsBox[0].checked === true) {//购买模式判断
      PrceType = 0
    }
    else if (OptionsBox[1].checked === true) {
      PrceType = 10
    };
    let array = this.data.array
    let time = "";
    if (array[this.data.index] === "立即出发") {//预约时间判断
      time = 0
      SubscribeTime = ""
    }
    else if (array[this.data.index] !== "立即出发") {
      time = 10
      let Times = utils.formatTime1(new Date());
      let day = Times.slice(0, 10)
      SubscribeTime = day + " " + this.data.array[this.data.index]
    };
    let PayMethod = this.data.radioItems
    let payment
    if (PayMethod[0].checked === true) {
      payment = 0
    } else if (PayMethod[1].checked === true) {
      payment = 100
    }
    let commodityList = this.data.commodityList
    let array1 = [];
    if (OptionsBox[0].checked === true) {//瓶
      for (let k = 0; k < commodityList.length; k++) {
        if (commodityList[k].Quantity > 0) {
          let OrderItems = {
            Price: utils.Encryption(commodityList[k].Price),
            Quantity: utils.Encryption(commodityList[k].Quantity),
            ProductId: utils.Encryption(commodityList[k].ProductId),
            Kilogram: 0
          }
          array1.push(OrderItems)
          this.setData({
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
          this.setData({
            OrderItems: array1
          })
        }
      }
    }
    console.log(this.data.OrderItems)
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        EnterpriseId: this.data.EnterpriseId,
        CustomerId: this.data.CustomerId,
        Price: utils.Encryption(this.data.Price),
        Quantity: utils.Encryption(this.data.Quantity),
        Contact: utils.Encryption(this.data.CustomerName),
        Phone: utils.Encryption(this.data.CustomerPhone),
        Address: utils.Encryption(this.data.CustomerAddress),
        Longitude: this.data.CustomerLatitude,
        Latitude: this.data.CustomerLongitude,
        GasBuyMode: PrceType,
        DistributionMode: time,
        SubscribeTime: SubscribeTime,
        PayMethod: payment,
        AccountId: this.data.AccountId,
        OrderItems: this.data.OrderItems,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
      },
    })
    wx.switchTab({
      url: "/pages/Order/Order",
    })
  },

  /**
     * 支付方式弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {
  },
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
  preventTouchMove: function () {
  },
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
  preventTouchMove: function () {
  },
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
    }
    else if (OptionsBox[0].checked === true && OptionsBox[1].checked === false) {
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
    if (OptionsBox[0].checked === true || OptionsBox[1].checked === false) {//瓶
      for (let i = 0; i < commodityList.length; i++) {
        let good = commodityList[i];
        Count += parseInt(good.Quantity);
        Price += good.Quantity * good.Price;
      }
      this.setData({
        Quantity: Count,
        Price: Price
      })
    } else {//公斤
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
  preventTouchMove: function () {
  },
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