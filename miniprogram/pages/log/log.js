let globalData = getApp().globalData;
const util = require('../../util/util.js')
Page({
  data: {
    version: globalData.version,
    logList: [{
      version: "preface",
      date: "2020-03-15",
      log: ["本程序包涵活动宣传，美文以及歌曲推荐，活动记录等功能，如果你有好滴歌曲或者心灵鸡汤都可向此作者投稿！联系方式：756095594(QQ)"]
    }, {
      version: "1.0.1",
      date: "2020-03-20",
      log: ["1.代码片段整理", "2.bug修复，以及部分兼容问题修复，代码优化","3.代码重构后端功能全部采用云开发"]
    }].reverse()
  },
  onLoad: function(options) {

  },
  getLink(e) {
    let link = e.currentTarget.dataset.link
    wx.setClipboardData({
      data: link,
      success(res) {
        wx.getClipboardData({
          success(res) {
            util.toast("链接已复制", 2000, true)
          }
        })
      }
    })
  }
})