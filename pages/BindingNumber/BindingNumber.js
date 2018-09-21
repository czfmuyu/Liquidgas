// pages/ReceivingAddress/ReceivingAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GasShowModal: false,//弹框按钮操控
    numberlist:[
      {
        number:"15000235658",
      },
      {
        number:"15000235658",
      },
      {
        number:"15000235658",
      },
    ],
  },
 /**
     * 名字弹窗
     */
    Gas () {
      this.setData({
        GasShowModal: true
      })
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },
    /**
     * 隐藏模态对话框
     */
    GasHideModal: function () {
      this.setData({
        GasShowModal: false
      });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onGasCancel: function () {
      this.GasHideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onGasConfirm: function () {
      wx.navigateTo({
        url: '/pages/Authorized/Authorized',
      })
      this.GasHideModal();
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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