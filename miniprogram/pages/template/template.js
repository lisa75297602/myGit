const util = require('../../util/util.js')
Page({
  data: {
    stepList: null
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'get_history'
    }).then((res) => {
      console.log(res)
      this.setData({
        stepList: res.result.data
      })
    }).catch((err) => {
      console.log(err)
    })
    wx.hideLoading()
  }
})