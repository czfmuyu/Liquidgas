let app = getApp()
var util = require('../../utils/util.js');
const baseUrl = app.globalData.baseUrl
// 获取维修订单
const baseUrls = `${baseUrl}/Api/RepairOrders/GetRepairOrderInfo`
// 取消订单接口
const cancel = `${baseUrl}/Api/RepairOrders/RepairOrderCancel`
// 确认订单
const Confirm = `${baseUrl}/Api/RepairOrders/RepairOrderConfirm`
const photo = `${baseUrl}/Api/Files/GetRepairPhoto`


Page({
  /**
   * 页面的初始数据
   */
  data: {
    ShowModal: false, //弹框按钮操控
    // 预览图片数组
    img: "",
    // 取消原因
    getdata: "",
    // 取消订单id
    ID: "",
    // 唯一订单编号
    Serialnumber: "",

    StateControl: 0,
    btn: 0,
    // 要渲染的数据
    detailedlist: {},
    photo:"",//图片路径
    imgs:[]
  },

  // 跳转评价
  Evaluate: function () {
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate',
    })
  },

  // 获取取消原因
  getdata: function (e) {
    let _this = this
    let getdatas = e.detail.value
    _this.setData({
      getdata: getdatas
    })
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    let _this = this
    // 订单
    let tomerId = _this.data.Serialnumber
    // 用户
    let orderId = _this.data.ID
    // 取消订单说明orderId
    let Explain = _this.data.getdata
    if (Explain !== "") {
      wx.request({
        url: cancel,
        data: {
          Sign: "",
          OrderId: orderId,
          CustomerId: tomerId,
          Explain: Explain
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.Data) {
            wx.showToast({
              title: "提交成功",
              duration: 1000
            });
            wx.switchTab({
              url: '/pages/RepairOrder/RepairOrder',
            })
          } else {
            util.showError("提交有误请从新提交")
            return false
          }
        },
      })
    } else {
      wx.showToast({
        title: "请填写取消原因",
        duration: 1000
      });
    }
    // 隐藏弹框
    _this.HideModal()
  },
  /**
   * 显示输入狂取消按键
   */
  phoneList() {
    this.setData({
      ShowModal: true,
    })
  },

  /**
   * 隐藏模态对话框
   */
  HideModal: function () {
    this.setData({
      ShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.HideModal();
  },


  // 确认订单
  Confirm: function () {
    // 订单
    let tomerId = this.data.Serialnumber
    // 用户
    let orderId = this.data.ID

    wx.request({
      url: Confirm,
      data: {
        Sign: "",
        OrderId: orderId,
        CustomerId: tomerId,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.Code == 200) {
          wx.switchTab({
            url: '/pages/RepairOrder/RepairOrder',
          })
        }
      },
    })
  },
  // 图片预览------------------------------
  previewImg: function (e) {
    var data_evnt = e; //将函数事件对象传入 ，以及图片获取到的数组 
    console.log(e)
    util.imgpreview(data_evnt, this.data.imgs)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      photo
    })
    let _this = this
    // 订单编号
    let orderIds = options.orderId
    // 客服id
    let seriaIs = options.seriaI
    _this.setData({
      ID: orderIds,
      Serialnumber: seriaIs
    })
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        orderId: orderIds,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let detailed = res.data.Data
        _this.setData({
          detailedlist: detailed
        })
        // 详情图片
        let imglist = _this.data.detailedlist.RepairPhotos
        _this.imgs(imglist)
        console.log(imglist)
        _this.setData({
          img: imglist
        })

        let footer = _this.data.detailedlist
        let footerels = footer.Status
        if (footerels == 0) {
          _this.setData({
            btn: 2
          })
        } else if (footerels == 30) {
          _this.setData({
            btn: 1
          })
        } else {
          return false
        }
      }
    })
   
  },
  imgs(imglist){
    let arr=[]
    for (let i = 0; imglist.length > i; i++) {
      let imgs = photo + "/?photoId=" + imglist[i].PhotoId
      arr.push(imgs)
    }
    this.setData({
      imgs:arr
    })
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

})