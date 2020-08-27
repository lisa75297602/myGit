// miniprogram/pages/page3/page3.js
var fav_nums = null
var qqNum = null
var bid = null
var _id = null
var publish = null
var pubdate = null
var plate = null
var score = null
var enddate = null
var title = null
var comments = null
var comment = null
const util = require('/../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    activity: null,
    likeStatus: false,
    likeCount: 0,
    posting: false,
    left: 0,
    right: 80,
    bottom: 100,
    bgColor: "#5677fc",
    btnList: [],
    list: [{
      bgColor: "#16C2C2",
      //图标/图片地址
      imgUrl: "../../images/fab/gaixie.png",
      //图片高度 rpx
      imgHeight: 64,
      //图片宽度 rpx
      imgWidth: 64,
      //名称
      text: "填表",
      //字体大小
      fontSize: 34,
      //字体颜色
      color: "#fff"
    }, {
      bgColor: "#64B532",
      //图标/图片地址
      imgUrl: "../../images/fab/ximxi.png",
      //图片高度 rpx
      imgHeight: 64,
      //图片宽度 rpx
      imgWidth: 64,
      //名称
      text: "群号",
      //字体大小
      fontSize: 34,
      //字体颜色
      color: "#fff"
    }, {
      bgColor: "#FFA000",
      //图标/图片地址
      imgUrl: "../../images/fab/dianzan-n.png",
      //图片高度 rpx
      imgHeight: 64,
      //图片宽度 rpx
      imgWidth: 64,
      //名称
      text: "点赞",
      //字体大小
      fontSize: 34,
      //字体颜色
      color: "#fff"
    }],
  },
  onTap: function (event) {
    console.log(event.detail.text)
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].content === event.detail.text) {
        comments[i].nums = comments[i].nums + 1
      }
    }
    // console.log(comments)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "updata_conmments_num",
      data: {
        id: bid,
        comments: comments
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    this._search_comments()
    wx.hideLoading()

  },
  date_set: function (event) {
    comment = event.detail.text || event.detail.value
  },
  onPost: function (event) {
    console.log(comment)
    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      btnList: [...this.data.list]
    })
    _id = options._id
    console.log(_id)
    bid = options.bid
    fav_nums = Number(options.fav_nums)
    // console.log(fav_nums)
    // console.log(fav_nums)
    // const bid = 2
    wx.cloud.init()
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'search_activity_detail'
    }).then((res) => {
      console.log(res.result.data[bid])
      qqNum = res.result.data[bid].QQNum
      publish = res.result.data[bid].publisher
      pubdate = res.result.data[bid].pubdate
      plate = res.result.data[bid].plate
      score = res.result.data[bid].score
      enddate = res.result.data[bid].enddate
      title = res.result.data[bid].title
      // console.log(qqNum, publish, pubdate, plate, score, enddate, title)

      this.setData({
        activity: res.result.data[bid]
      })
    })
    this._search_comments()
    wx.hideLoading()
  },
  _search_comments() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'search_activity_comments',
      data: {
        id: bid
      }
    }).then((res) => {
      comments = res.result.data[0].comments
      console.log(comments)
      this.setData({
        comments: res.result.data[0].comments
      })
    })


    wx.hideLoading()

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

  },
  onClick(e) {
    let index = e.detail.index
    switch (index) {
      case -1:
        util.toast("您点击了悬浮按钮")
        break;
      case 0:
        wx.navigateTo({
          url: `../../pages/formValidation/formValidation?id=${bid}&&publish=${publish}&&pubdate=${pubdate}&&plate=${plate}&&score=${score}&&enddate=${enddate}&&title=${title}`
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
  clipboard: function (data) {
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
  }
})