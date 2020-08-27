let globalData = getApp().globalData;
const util = require('../../util/util.js');
Page({
  data: {
    version: globalData.version
  },
  onLoad: function(options) {},
  resume: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../ZJResume/ZJResume',
    })
  },
  copy: function(e) {
    console.log(e.target.dataset.text)
    wx.setClipboardData({
      data: e.target.dataset.text,
      success(res) {
        wx.getClipboardData({
          success(res) {
            // console.log(res.data) // data
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  log: function() {
    wx.navigateTo({
      url: '../log/log'
    })
  }
})