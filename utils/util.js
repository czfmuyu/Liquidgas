function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
//加密
function Encryption(data) {
  return data
}
//解密
function Decrypt(data) {
  return data
}
function imgpreview(data_evnt, imgarrs) {  //图片预览
  //获取当前图片的下标
  var index = data_evnt.currentTarget.dataset.index;
  //所有图片
  var imgs = imgarrs;
  wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
  })
}



/**
  * 图片上传
  */
 function uploadImg(callback) {
  let _this = this;
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: function (res) {
      let tempFilePaths = res.tempFilePaths;
      console.log("上传" + tempFilePaths)
      wx.showLoading({
        title: '图片上传中...',
      });
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
          wx.hideLoading();
        }
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  Encryption:Encryption,
  Decrypt:Decrypt,
  imgpreview:imgpreview,
  uploadImg: uploadImg,


}
