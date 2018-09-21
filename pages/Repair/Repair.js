// pages/Repair/Repair.js
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [
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
    index: 0,
    showModal: false,//控制地址弹框按钮
    isAddress: true,//控制地址隐藏显示
    name: "",
    phone: "15000822230",
    address: "浙江省杭州市江千区浙江大学华家池校区西门对面3栋11楼402室",
    guaranteeList:[{name:"气质问题"},{name:"灶具问题"},{name:"漏气问题"},{name:"钢瓶阀门问题"}],
    // 图片
    orderData: {
      
      images: []
    },
  },
  
  Submit(){
    wx.switchTab({//主页面
      url: '/pages/HomePage/HomePage'
    })
  },
  //Picker索引值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
  Add() {
    this.setData({
      showModal: true,
    })
  },

  /**
  * 上传图片
  */
  uploadImg: function () {
    let _this = this;
    let imgs = _this.data.orderData.images;
    if (imgs.length >= 9) {
      util.showError('最多上传9张图片');
      return false;
    }
    _this.chooseimage()
  },
  //选择相机还是本地图片
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#2168d3",
      success: function (res) {
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

  chooseWxImage: function (type) {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = _this.data.orderData.images;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            _this.setData({
              "orderData.images": imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        //  console.log(imgs);
        _this.setData({
          "orderData.images": imgs
        });
      }
    });
  },


  /**
   * 移除图片
   */
  removeImg(e) {
    let img = e.target.dataset.img_url;
    let imgs = this.data.orderData.images;
    imgs.splice(imgs.indexOf(img), 1);
    this.setData({
      'orderData.images': imgs
    })
  },
  // 图片预览
  previewImg: function (e) {
    var data_evnt = e;   //将函数事件对象传入 ，以及图片获取到的数组 
    util.imgpreview(data_evnt, this.data.orderData.images)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = this.data.name
    if (name === "") {//判断是否有数据页面切换
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