// pages/Repair/Repair.js
var util = require('../../utils/util.js');
let app = getApp().globalData
const baseUrl = app.baseUrl
// 获取维修项目
const baseUrls = `${baseUrl}/Api/RepairOrders/GetRepairLabels`
// 提交维修订单
const baseUrlBd = `${baseUrl}/Api/RepairOrders/CustomerSubmitOrder`
// 提交照片
const Urlsimg = `${baseUrl}/Api/Files/UploadImg`
let j=0
// 控制用户不可以多次点击
let frequency=0
// 维修项目
let Repairs=0
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
    index: 0,
    isAddress: true, //控制地址隐藏显示
    // 要提交的数据
    frolist: {
      Contact: "",
      Phone: "",
      Address: "",
      // 预约时间
      SubscribeTime: "立即出发",
      // 维修描述
      ProblemDescription: "",
      // 照片编码
      PhotoIds: "",
      // 企业编号
      EnterpriseId: "",
      // 用户编号
      CustomerId: "",
      // 经纬度
      Longitude: "",
      Latitude: "",
      // 用户唯一编码
      AccountId: "",
      // 维修编号
      RepairLabelIds: "",
      // 服务模式
      ServiceMode: "0",
    },
    // 点击后的保修
    RepairLabel: [],
    // 渲染的保修列表
    guaranteeList: [],

    // 图片数组
    pics: [],
    index: "0",
    // 上传图片编号
    identifier: [],
    //判断图片是否上传完毕
    indexs: "",
    // button禁用
    Disable:false,
  },

  // 提交订单控制不能连续多次点击
  Beforesubmission() {
    if (frequency==0){
        frequency++
      this.uploadimg()
    }
  },

  // 表单提交=========================
  Submit() {
    let _this = this
    let frolists = _this.data.frolist
    let Times = util.formatTime1(new Date());
    let day = Times.slice(0, 10)
    let days = Times.slice(10, 16)
    let Time = frolists.SubscribeTime
    if (Time == "立即出发") {
      Time = days
    }
    // 时间拼接
    let SubscribeTime = day + " " + Time
    let pics = _this.data.pics
    let Contact = frolists.Contact
    let Phone = frolists.Phone
    let Address = frolists.Address
    let ProblemDescription = frolists.ProblemDescription
    let ServiceMode = frolists.ServiceMode
    let RepairLabelIds = frolists.RepairLabelIds
    let PhotoIds = frolists.PhotoIds
    let AccountId = frolists.AccountId
    let Longitude = frolists.Longitude
    let Latitude = frolists.Latitude
    let CustomerId = frolists.CustomerId
    let EnterpriseId = frolists.EnterpriseId
    if (RepairLabelIds == "") {
      wx.showToast({
        title: "请选择维修项目",
        image: "../../imgs/xcit.png",
        duration: 2000
      })
      frequency = 0//用户提交后在让其可点击
      return false
    }
    if (ProblemDescription == "") {
      wx.showToast({
        title: "请添加问题描述",
        image: "../../imgs/xcit.png",
        duration: 2000
      })
      frequency = 0//用户提交后在让其可点击
      return false
    }
    if (pics.length < 1) {
      wx.showToast({
        title: "请添加照片",
        image: "../../imgs/xcit.png",
        duration: 2000
      })
      frequency = 0//用户提交后在让其可点击
      return false
    }
    wx.request({
      url: baseUrlBd,
      data: {
        Sign: "",
        EnterpriseId: EnterpriseId, //企业唯一编号
        CustomerId: CustomerId, //客服唯一编号
        Contact: util.Encryption(Contact), //名字
        Phone: util.Encryption(Phone), //电话
        Address: util.Encryption(Address), //地址
        Latitude: Latitude, //
        Longitude: Longitude,
        ServiceMode: ServiceMode, //服务模式
        SubscribeTime: SubscribeTime, //预约时间
        ProblemDescription: ProblemDescription, //问题描述
        RepairLabelIds: RepairLabelIds, //维修编号
        PhotoIds: PhotoIds, //照片编号
        AccountId: AccountId, //帐号唯一编号  
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(res) {
        frequency = 0//用户提交后在让其可点击
        if (res.data.Code == 200) {
          wx.switchTab({ //主页面
            url: '/pages/RepairOrder/RepairOrder'
          })
        } else {
          wx.showToast({
            title: res.data.Msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },

  // 获取点的什么维修事项===================
  Discoloration: function(e) {
    let _this = this
    let index = e.target.dataset.index - 1
    let list = _this.data.guaranteeList
    // 拼接点击过的项目
    let prpair = _this.data.RepairLabel
    if (list[index].Enabled == true) {
      list[index].Enabled = false
    } else {
      list[index].Enabled = true
    }
    _this.setData({
      guaranteeList: list
    })
    for (let i = 0; i < _this.data.guaranteeList.length; i++) {
      if (_this.data.guaranteeList[i].Enabled == false) {
        let sort = _this.data.guaranteeList[i].ID
        var maintenanceitem
        // 数组拼接，转字符串拼接
        prpair = prpair.concat(sort);
        maintenanceitem = prpair.join(',');
        _this.setData({
          "frolist.RepairLabelIds": maintenanceitem
        })
      }
    }
    _this.data.guaranteeList.forEach(item => {
      if (item.Enabled !== false) {
        Repairs++
        if (_this.data.guaranteeList.length == Repairs){
          Repairs=0
          _this.setData({
            "frolist.RepairLabelIds": ""
          })
        }
      }else{
        Repairs = 0
      }
    })
  },


  // 获取报修项目
  repair: function() {
    let _this = this
    wx.request({
      url: baseUrls,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        let guaranteeList = res.data.Data
        console.log(guaranteeList)
        if (res.data.Code == 200) {
          _this.setData({
            guaranteeList: guaranteeList
          })
        } else {
          wx.showToast({
            title: res.data.Msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },

  //获取用户选择时间
  bindPickerChange: function(e) {
    let timelist = this.data.array
    let index = e.detail.value
    let timelists = timelist[index]
    if (timelists == "立即出发") {
      this.setData({
        "frolist.ServiceMode": 0,
      })
    } else {
      this.setData({
        "frolist.ServiceMode": 10,
        "frolist.SubscribeTime": timelists
      })
    }

  },


  /**
   * 地址隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 地址对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  // 用户名称
  userName(e) {
    this.setData({
      "frolist.Contact": e.detail.value
    })
  },
  // 用户电话
  userPhone(e) {
    this.setData({
      "frolist.Phone": e.detail.value
    })
  },
  // 用户地址
  userAddress(e) {
    this.setData({
      "frolist.Address": e.detail.value
    })
  },
  // 获取故障描述
  textm: function(e) {
    let _this = this
    let textm = e.detail.value
    _this.setData({
      "frolist.ProblemDescription": textm
    })
  },


  /**
   * 地址无数据隐藏页面弹框
   */
  Add() {
    let num = 2
    wx.setStorageSync("page", num)
    wx.navigateTo({
      url: '/pages/GasInformation/GasInformation',
    })
  },


  pictureuploading() { //这里是选取图片的方法
    var that = this,
      pics = this.data.pics;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;　
        console.log(imgsrc)　　　　　　　　
        pics = pics.concat(imgsrc);
        if (pics.length > 9) {
          wx.showToast({
            title: "最多上传9张图片！",
            image: "../../imgs/xcit.png",
            duration: 2000
          });
        }
        that.setData({
          pics: pics
        });
      },
    })
  },

  //多张图片上传
  uploadimg: function(data) {
    console.log("吃吃2222")
    let that = this
    let pics = that.data.pics;
    let imglist = that.data.identifier
    if (pics.length == 0){
      wx.showToast({
        title: "请上传照片！",
        image: "../../imgs/xcit.png",
        duration: 1000
      });
      frequency = 0//用户提交后在让其可点击
      return false;
    } else if (pics.length > 9){
      wx.showToast({
        title: "最多上传9张图片！",
        image: "../../imgs/xcit.png",
        duration: 1000
      });
      frequency = 0//用户提交后在让其可点击
      return false;
    }
    for (let i = 0; i < pics.length; i++) {
      wx.uploadFile({
        url: Urlsimg,
        filePath: pics[i],
        name: 'image', //这里根据自己的实际情况改key
        formData: null, //这里是上传图片时一起上传的数据
        success: (res) => {
          console.log(res)
          let data = res.data
             let imglists = JSON.parse(data);
          if(imglists.Code==200){
            var identifier
            let datalist = imglists.Data
            imglist = imglist.concat(datalist)
            identifier = imglist.join(',');
            that.setData({
              "frolist.PhotoIds": identifier,
            })
            // 判断当图片上传完毕后调用表单提交
            j++
            if (pics.length == j) {
              that.Submit()
              j = 0
            }
          }else{
            wx.showToast({
              title: res.data.Msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
      });
    }
  },


  /**
   * 移除图片
   */
  removeImg(e) {
    let img = e.target.dataset.img_url;
    let imgs = this.data.pics;
    imgs.splice(imgs.indexOf(img), 1);
    this.setData({
      pics: imgs
    })
  },
  // 图片预览
  previewImg: function(e) {
    var data_evnt = e; //将函数事件对象传入 ，以及图片获取到的数组 
    util.imgpreview(data_evnt, this.data.pics)
  },


  /**
   * 生命周期函数--监听页面加载*******
   */
  onLoad: function(options) {
    let _this = this
    _this.repair() //获取保修项目
    // 企业编号
    let EnterpriseId = app.Customer.EnterpriseId
    // 用户编码
    let CustomerId = app.Customer.CustomerId
    // 用户唯一编码
    let AccountId = app.Customer.AccountId
    _this.setData({
      "frolist.EnterpriseId": EnterpriseId,
      "frolist.CustomerId": CustomerId,
      "frolist.AccountId": AccountId,
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _this = this
    //新用户渲染
    if (app.Orderaddress.Contact !== "" || app.Orderaddress.Phone !== "" || app.Orderaddress.Address !== "") {
      let name = app.Orderaddress.Contact
      let phone = app.Orderaddress.Phone
      let Address = app.Orderaddress.Address
      let Longitude = app.Orderaddress.Longitude
      let Latitude = app.Orderaddress.Latitude
      _this.setData({
        "frolist.Contact": name,
        "frolist.Phone": phone,
        "frolist.Address": Address,
        "frolist.Longitude": Longitude,
        "frolist.Latitude": Latitude,
      })
    } else { //老用户渲染
      let name = app.Customer.CustomerName
      let phone = app.Customer.CustomerPhone
      let Address = app.Customer.CustomerAddress
      let Longitude = app.Customer.CustomerLongitude
      let Latitude = app.Customer.CustomerLatitude
      _this.setData({
        "frolist.Contact": name,
        "frolist.Phone": phone,
        "frolist.Address": Address,
        "frolist.Longitude": Longitude,
        "frolist.Latitude": Latitude,
      })
    }

    let frolist1 = _this.data.frolist
    if (frolist1.Contact == "" || frolist1.Contact == undefined) { //判断是否有数据页面切换
      this.setData({
        isAddress: true,
      })
    } else {
      this.setData({
        isAddress: false,
      })
    }
  },
})


