// pages/Repair/Repair.js
var util = require('../../utils/util.js');
let app = getApp()
const baseUrl = app.globalData.baseUrl
// 发送照片
const baseUrls = `${baseUrl}/Api/RepairOrders/GetRepairLabels`
// 提交维修订单
const baseUrlBd = `${baseUrl}/Api/RepairOrders/NewRepairOrder`
		

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '立即出发',
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
    ], //预定时间弹框
    index: 0,
    showModal: false, //控制地址弹框按钮
    isAddress: true, //控制地址隐藏显示
    // 要提交的数据
    frolist: {
      Contact: "",
      Phone: "",
      Address: "",
      // 预约时间
      SubscribeTime:"立即出发",
      // 维修描述
      ProblemDescription:"",
      // 照片编码
      PhotoIds:"1",
      // 企业编号
      EnterpriseId:"",
      // 用户编号
      CustomerId:"",
      // 经纬度
      Longitude:"",
      Latitude:"",
      // 用户唯一编码
      AccountId:"",
      // 维修编号
      RepairLabelIds:"",
      // 服务模式
      ServiceMode:"0",

      images: [],
    },
    guaranteeList:[],
  //  判断选项状态
    changeType:1,
    sss:""
  },
 

// 表单提交=========================
  Submit() {
    let _this=this
    let imglent = _this.data.frolist.images
    let frolists = _this.data.frolist

    console.log(frolists)
    let Contact = frolists.Contact
    let Phone = frolists.Phone
    let Address = frolists.Address
    let SubscribeTime = frolists.SubscribeTime
    let ProblemDescription = frolists.ProblemDescription
    let ServiceMode = frolists.ServiceMode
    let RepairLabelIds = frolists.RepairLabelIds
    let PhotoIds = frolists.PhotoIds
    let AccountId = frolists.AccountId
    let Longitude = frolists.Longitude
    let Latitude = frolists.Latitude
    let CustomerId = frolists.CustomerId
    let EnterpriseId = frolists.EnterpriseId
    
    if (imglent.length<1){
      wx.showToast({
        title: "请添加照片",
        duration: 2000
      })
      return false
    }
    wx.request({
      url: baseUrlBd,
      data: {
        Sign: "",
        Contact: util.Encryption(Contact)  ,
        Phone: util.Encryption(Phone)  ,
        Address: util.Encryption(Address) ,
        SubscribeTime: SubscribeTime,
        ProblemDescription: ProblemDescription,
        AccountId: AccountId,
        PhotoIds: PhotoIds,
        RepairLabelIds: RepairLabelIds,
        ServiceMode: ServiceMode,
        Latitude: Latitude,
        Longitude: Longitude,
        CustomerId: CustomerId,
        EnterpriseId: EnterpriseId,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.Code == 200) {
        } else {
          console.log("错误")
        }
      },
    })
    wx.switchTab({ //主页面
      url: '/pages/HomePage/HomePage'
    })
  },
// 获取点的什么维修事项===================
  Discoloration:function(e){
    let _this=this
    let index = e.target.dataset.index-1
    let list = _this.data.guaranteeList
    if (list[index].Enabled==true){
      list[index].Enabled=false
    } else{
      list[index].Enabled=true
    }
    _this.setData({
      guaranteeList: list
    })

    for (let i=0; i<_this.data.guaranteeList.length; i++){
      if (_this.data.guaranteeList[i].Enabled==false){
        let ss = _this.data.guaranteeList[i].ID
        _this.setData({
          "frolist.RepairLabelIds":ss
        })
      }
    }

    // _this.setData({
    //   "frolist.RepairLabelIds": index,
    // })
  },


// 获取报修项目
repair:function(){
  let _this=this
  wx.request({
    url: baseUrls,
    data:{},
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    success: function (res) {
      let guaranteeList=res.data.Data
      console.log(guaranteeList)
      if (res.data.Code == 200) {
        _this.setData({
          guaranteeList: guaranteeList
        })
      } else {
        console.log("错误")
      }
    },
  })
},

  //获取用户选择时间
  bindPickerChange: function(e) {
    let timelist = this.data.array
    let index = e.detail.value
    let timelists = timelist[index]
    if (timelists=="立即出发"){
      this.setData({
        "frolist.ServiceMode":10
      })
    }
    this.setData({
      "frolist.SubscribeTime": timelists
    })
  },
  // 获取用户选择立即出发

  /**
   * 地址弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
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
  textm:function(e){
    let _this=this
    let textm = e.detail.value
    _this.setData({
      "frolist.ProblemDescription": textm
    })
  },

  /**
   * 地址对话框确认按钮点击事件
   */
  
  // 表单验证正确后才可以隐藏表格
  onConfirm: function() {
    let fomlist = this.data.frolist
    let telphone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!fomlist.name || !fomlist.phone || !fomlist.address) {
      wx.showToast({
        title: '请完整填写信息',
       
        duration: 2000
      })
      return false
    }
    if (!telphone.test(fomlist.phone)) {
      wx.showToast({
        title: '电话输入有误',
        
        duration: 2000
      })
      return false
    }
    this.setData({
      isAddress: false,
    })
    this.hideModal();
  },

  /**
   * 地址无数据隐藏页面弹框
   */
  Add() {
    this.setData({
      showModal: true,
    })
  },

  /**
   * 上传图片
   */
  uploadImg: function() {
    let _this = this;
    let imgs = _this.data.frolist.images;
    if (imgs.length >= 9) {
      util.showError('最多上传9张图片');
      return false;
    }
    _this.chooseimage()
  },
  //选择相机还是本地图片
  chooseimage: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#2168d3",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function(type) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        var imgs = _this.data.frolist.images;
        imgs.push(tempFilePaths[0]);
        _this.setData({
          "frolist.images":imgs
        })
        wx.uploadFile({
          url: "http://192.168.0.185:2599/Api/Files/UploadImg",
          // 要上传的文件资源
          filePath: tempFilePaths[0],
          // 对应的key值
          name: 'image',
          success: function (res) {
            console.log(res)
            imgarr.push(tempFilePaths)
            res.imgurl = imgarr
            console.log(imgarr)
            console.log(res.imgurl)
            // tempFilePaths
            // res.imgurl.push(tempFilePaths)
            if (typeof callback == 'function') {
              callback(res);
            }
          }
        })
      }
    })
  },


  /**
   * 移除图片
   */
  removeImg(e) {
    let img = e.target.dataset.img_url;
    let imgs = this.data.frolist.images;
    imgs.splice(imgs.indexOf(img), 1);
    this.setData({
      'frolist.images': imgs
    })
  },
  // 图片预览
  previewImg: function(e) {
    var data_evnt = e; //将函数事件对象传入 ，以及图片获取到的数组 
    util.imgpreview(data_evnt, this.data.frolist.images)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    let _this = this
    _this.repair()
    // 获取本地缓存
    wx.getStorage({
      key: 'Information',
      success: function (res) {
        let name = res.data.AccountName
        
        let phone = res.data.AccountPhone
        let address = res.data.CustomerAddress
        // 企业编号
        let EnterpriseId = res.data.EnterpriseId
        // 用户编码
        let CustomerId = res.data.CustomerId
        // 经纬度
        let Longitude = res.data.CustomerLongitude
        let Latitude = res.data.CustomerLatitude
        // 用户唯一编码
        let AccountId = res.data.AccountId
     
        // name1:util.Decrypt(name)
        // phone1: util.Decrypt(phone)
        // address1: util.Decrypt(address)
        _this.setData({
          "frolist.Contact": name,
          "frolist.Phone": phone,
          "frolist.Address": address,
          "frolist.EnterpriseId": EnterpriseId,
          "frolist.CustomerId": CustomerId,
          "frolist.Longitude": Longitude,
          "frolist.Latitude": Latitude,
          "frolist.AccountId": AccountId,
        })
      },
    })
    let frolist1 = _this.data.frolist
    if (frolist1.Contact !== "") { //判断是否有数据页面切换
      this.setData({
        isAddress: true,
      })
    } else {
      this.setData({
        isAddress: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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

// wx.chooseImage({
//   count: 9, // 默认9
//   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
//   sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
//   success: function (res) {
//     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//     var tempFilePaths = res.tempFilePaths;
//     var imgs = _this.data.frolist.images;
//     for (var i = 0; i < tempFilePaths.length; i++) {
//       if (imgs.length >= 9) {
//         _this.setData({
//           "frolist.images": imgs
//         });
//         return false;
//       } else {
//         imgs.push(tempFilePaths[i]);
//       }
//     }
//     //  console.log(imgs);
//     _this.setData({
//       "frolist.images": imgs
//     });
//   }
// });