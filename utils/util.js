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
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  Encryption:Encryption,
  Decrypt:Decrypt,
  imgpreview:imgpreview,
}
