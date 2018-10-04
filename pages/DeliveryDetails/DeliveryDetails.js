let utils = require('../../utils/util.js');
let amap = require("../../utils/amap");
let app = getApp().globalData
const { baseUrl } = getApp().globalData;
const baseUrls = `${baseUrl}/Api/GasOrders/GetOrderInfo`//获取订单详情接口
const cancel = `${baseUrl}/Api/GasOrder/CustomerCancelOrder` //取消订单
const Confirm = `${baseUrl}/Api/GasOrders/CustomerConfirmOrder` //确认订单
Page({
  data: {
    //地图参数
    cindex: "0",
    types: ["getDrivingRoute", "getWalkingRoute", "getTransitRoute", "getRidingRoute"],
    markers: [],
    polyline: [],
    distance: '',
    cost: '',
    transits: [],
    city: "",
    name: "",
    desc: "",
    //每个状态的显示和隐藏
    StateControl: 0,
    btn: 0,
    //模拟数据
    CustomerId: "874356382",
    Creator: "王某某",
    Quantity: 11,
    Price: 1200,
    CreateMode: "在线支付",
    ReserveTime: "08:00-09:00",
    Address: "浙江省杭州市江千区浙江大学华家池校区西门对面三栋",
    Contact: "郑菲",
    Phone: "15000822230",
    OrderTrackList: [],
    goodsList: [],
    ShowModal: false, //弹框按钮操控
    orderId: "",
    getdata: "",//取消说明
    day: "",
    time: ""
  },
  onLoad(options) {
    this.queryDetails(options)
    //地图逻辑
    // console.log(e)
    // let { latitude, longitude, latitude2, longitude2, city, name, desc } = e;
    let latitude = "30.641904";
    let longitude = "104.043243";
    let latitude2 = "30.642839";
    let longitude2 = "104.044046";
    let city = "成都市";
    let name = "卫味盐帮菜";
    let desc = "蜀汉街武侯祠大街258号";
    let markers = [
      {
        iconPath: "/images/mapicon_navi_s.png",
        id: 0,
        latitude,
        longitude,
        width: 23,
        height: 33
      },
      {
        iconPath: "/images/mapicon_navi_e.png",
        id: 1,
        latitude: latitude2,
        longitude: longitude2,
        width: 24,
        height: 34
      }
    ];
    this.setData({
      latitude, longitude, latitude2, longitude2, markers, city, name, desc
    });
    this.getRoute();


  },
  // 获取取消原因
  getdata: function (e) {
    let getdatas = e.detail.value
    this.setData({
      getdata: getdatas
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
  /**
   * 显示取消框
   */
  phoneList(e) {
    let _this = this
    let id = e.target.dataset.orderid
    let orderID = e.target.dataset.serial
    _this.setData({
      ShowModal: true,
      ID: id,
      Serialnumber: orderID
    })
  },
  // 确认收货
  Confirm: function (e) {
    let this_ = this
    wx.request({
      url: Confirm,
      data: {
        Sign: "",
        OrderId: this_.data.orderId,
        CustomerId: app.CustomerId.CustomerId,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: "确认成功",
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/Order/Order',
        })
      },
    })
  },
  //取消订单
  onConfirm() {
    let this_ = this
    console.log(this_.data.OrderTrackList.CustomerId)
    if (this_.data.getdata !== "") {
      wx.request({
        url: cancel,
        data: {
          Sign: "",
          OrderId: this_.data.orderId,
          CustomerId: this_.data.OrderTrackList.CustomerId,
          Explain: this_.data.getdata
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          wx.showToast({
            title: "取消成功！",
            duration: 2000
          });
          // 隐藏弹框
          this_.HideModal()
          wx.switchTab({
            url: '/pages/Order/Order',
          })
        },
      })
    } else {
      wx.showToast({
        title: "请填写取消原因",
        duration: 1000
      });
      return false
    }

  },
  //页面判断改变
  Pagechange() {
    // 数据判断页面改动
    console.log(this.data.OrderTrackList.Status)
    if (this.data.OrderTrackList.Status < 30) {//配送中
      this.setData({
        StateControl: 1,
        btn: 1
      })
    } else if (this.data.OrderTrackList.Status == 30) {//配送完成
      this.setData({
        StateControl: 2,
        btn: 2
      })
    } else {
      console.log("1")
      this.setData({//取消订单
        StateControl: 3,
        btn: 3
      })
    }
  },
  //查询订单详情
  queryDetails(options) {
    let this_ = this
    wx.request({
      url: baseUrls,
      data: {
        sign: "",
        orderId: options.id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data.Data
        console.log(data)
        utils.Decrypt(data.Address)
        utils.Decrypt(data.Contact)
        utils.Decrypt(data.Phone)
        let OrderItems = res.data.Data.OrderItems
        for (let i = 0; i < OrderItems.length; i++) {
          utils.Decrypt(OrderItems.ProductName)
          utils.Decrypt(OrderItems.Price)
          utils.Decrypt(OrderItems.Quantity)
        }
        let Times = data.FormatSubscribeTime
        if (Times !== null) {
          let day = Times.slice(0, 10)
          let time = Times.slice(11, 16)
          console.log(day, time)
          this_.setData({
            day: day,
            time: time,
          })
        }
        this_.setData({
          OrderTrackList: data,
          goodsList: OrderItems,
          orderId: options.id,
        })
        this_.Pagechange()
      },
    })
  },
  // 评价跳转页面
  Evaluate: function () {
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate',
    })
  },
  changeType(e) {
    let { id } = e.target.dataset;
    let { cindex } = this.data;
    if (id == cindex) return;
    this.setData({ cindex: id });
    this.getRoute();
  },
  getRoute() {
    let { latitude, longitude, latitude2, longitude2, types, cindex, city } = this.data;
    let type = types[cindex];
    let origin = `${longitude},${latitude}`;
    let destination = `${longitude2},${latitude2}`;
    amap.getRoute(origin, destination, type, city)
      .then(d => {
        // console.log(d);
        this.setRouteData(d, type);
      })
      .catch(e => {
        console.log(e);
      })
  },
  setRouteData(d, type) {
    if (type != "getTransitRoute") {
      let points = [];
      if (d.paths && d.paths[0] && d.paths[0].steps) {
        let steps = d.paths[0].steps;
        wx.setStorageSync("steps", steps);
        steps.forEach(item1 => {
          let poLen = item1.polyline.split(';');
          poLen.forEach(item2 => {
            let obj = {
              longitude: parseFloat(item2.split(',')[0]),
              latitude: parseFloat(item2.split(',')[1])
            }
            points.push(obj);
          })
        })
      }
      this.setData({
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      });
    }
    else {
      if (d && d.transits) {
        let transits = d.transits;
        transits.forEach(item1 => {
          let { segments } = item1;
          item1.transport = [];
          segments.forEach((item2, j) => {
            if (item2.bus && item2.bus.buslines && item2.bus.buslines[0] && item2.bus.buslines[0].name) {
              let name = item2.bus.buslines[0].name;
              if (j !== 0) {
                name = '--' + name;
              }
              item1.transport.push(name);
            }
          })
        })
        this.setData({ transits });
      }
    }
    if (type == "getDrivingRoute") {
      if (d.paths[0] && d.paths[0].distance) {
        this.setData({
          distance: d.paths[0].distance + '米'
        });
      }
      if (d.taxi_cost) {
        this.setData({
          cost: '打车约' + parseInt(d.taxi_cost) + '元'
        });
      }
    }
    else if (type == "getWalkingRoute" || type == "getRidingRoute") {
      if (d.paths[0] && d.paths[0].distance) {
        this.setData({
          distance: d.paths[0].distance + '米'
        });
      }
      if (d.paths[0] && d.paths[0].duration) {
        this.setData({
          cost: parseInt(d.paths[0].duration / 60) + '分钟'
        });
      }
    }
    else if (type == "getRidingRoute") {

    }
  },
  goDetail() {
    let url = `/pages/info/info`;
    wx.navigateTo({ url });
  },
  nav() {
    let { latitude2, longitude2, name, desc } = this.data;
    wx.openLocation({
      latitude: +latitude2,
      longitude: +longitude2,
      name,
      address: desc
    });
  }
});