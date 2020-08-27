// miniprogram/pages/page2/page2.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys: [],
    searching: false,
    more: '',
    left: 0,
    right: 80,
    bottom: 100,
    bgColor: "#66ffff",
    btnList: [],
    list: [{
        bgColor: "#ff66cc",
        //图标/图片地址
        imgUrl: "../../images/fab/发布.png",
        //图片高度 rpx
        imgHeight: 64,
        //图片宽度 rpx
        imgWidth: 64,
        //名称
        text: "发布",
        //字体大小
        fontSize: 34,
        //字体颜色
        color: "#fff"
      }, {
        bgColor: "#ff9900",
        //图标/图片地址
        imgUrl: "../../images/fab/banjo.png",
        //图片高度 rpx
        imgHeight: 64,
        //图片宽度 rpx
        imgWidth: 64,
        //名称
        text: "编辑",
        //字体大小
        fontSize: 34,
        //字体颜色
        color: "#fff"
      },
      {
        bgColor: "#66cc00",
        //图标/图片地址
        imgUrl: "../../images/fab/zhuyin.png",
        //图片高度 rpx
        imgHeight: 64,
        //图片宽度 rpx
        imgWidth: 64,
        //名称
        text: "说明",
        //字体大小
        fontSize: 34,
        //字体颜色
        color: "#fff"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'search_activity_list'
    }).then((res) => {
      this.setData({
        activitys: res.result.data
      })
    })
    this.setData({
      btnList: [...this.data.list]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onClick(e) {
    let index = e.detail.index
    switch (index) {
      case -1:
        util.toast("您点击了悬浮按钮")
        break;
      case 0:
        wx.navigateTo({
          url: '../../pages/publish/publish'
        })
        break;
      case 1:
        this.clipboard(qqNum)
        break;
      case 2:
        wx.cloud.init()
        wx.cloud.callFunction({
          name: 'updata_like_detail',
          data: {
            _id: _id,
            fav_nums: fav_nums + 1
          }
        }).then((res) => {
          wx.showToast({
            title: '点赞成功',
          })
        }).catch((err) => {
          console.log(err)
          wx.showToast({
            title: '点赞失败',
          })
        })
        break;
      default:
        break;
    }
  },

  clipboard: function(data) {
    wx.setClipboardData({
      data: data,
      success(res) {
        wx.getClipboardData({
          success(res) {
            util.toast("QQ群号已复制", 2000, true)
          }
        })
      }
    })
  },


  onSearching(event) {
    this.setData({
      searching: true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom() {

  }

})