let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
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
    StateControl:0,
    btn:0,
    //模拟数据
    CustomerId: "874356382",
    status: "配送中",
    Creator: "王某某",
    Quantity: 11,
    Price: 1200,
    CreateMode: "在线支付",
    ReserveTime: "08:00-09:00",
    Address: "浙江省杭州市江千区浙江大学华家池校区西门对面三栋",
    Contact: "郑菲",
    Phone: "15000822230",
    OrderTrackList: {
      Operator: "李某某",
      OperateTime: "14:00",
    },
    goodsList: [
      {
        Name: "商品1",
        Price: 120,
        PrceType: "瓶",
        Quantity: 3,
      },
      {
        Name: "商品2",
        Price: 120,
        PrceType: "公斤",
        Quantity: 2,
      },
      {
        Name: "商品3",
        Price: 120,
        PrceType: "瓶",
        Quantity: 3,
      },
      {
        Name: "商品4",
        Price: 120,
        PrceType: "公斤",
        Quantity: 3,
      },
    ]
  },
  onLoad(e) {
    //数据判断页面改动
    if (this.data.status === "配送中") {
      this.setData({
        StateControl:1,
        btn:1
      })
    } else if (this.data.status === "待评价") {
      this.setData({
        StateControl:2,
        btn:2
      })
    } else {
      this.setData({
        StateControl:2,
      })
    }
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
      }, {
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