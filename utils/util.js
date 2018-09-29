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
function formatTime1(date) {  
    var year = date.getFullYear()  
    var month = date.getMonth() + 1  
    var day = date.getDate()  
    
    var hour = date.getHours()  
    var minute = date.getMinutes()  
    var second = date.getSeconds()  
    
    return [year, month, day].map(formatNumber1).join('/') + ' ' + [hour, minute, second].map(formatNumber1).join(':')  
  }  
    
  function formatNumber1(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n  
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
	 * 错误消息提示
	 */
  function showError(err_msg,url) {
    wx.showModal({
      title: '提示',
      content: err_msg,
      showCancel: false,
      confirmColor: "#72bf5e",
      success: res=>{
        if(url){
          if(url.indexOf('user/index') > -1){
            wx.switchTab({
              url: url,
            })
          }else{
            wx.navigateTo({
              url: url,
            })
          }
        }
      }
    })
  }
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  Encryption:Encryption,
  Decrypt:Decrypt,
  imgpreview:imgpreview,
  showError: showError,
  formatTime1:formatTime1,
  formatNumber1:formatNumber1,
}
