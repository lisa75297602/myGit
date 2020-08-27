// miniprogram/pages/page4/page4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.userAuthorized()
    wx.cloud.init()
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'search_Llike'
    }).then((res) => {
      // console.log(res.result.data)
      // const a = res.result.data.length
      this.setData({
        classics: res.result.data,
      })
      // console.log(a)
    })
    wx.cloud.callFunction({
      name: 'get_history'
    }).then((res) => {
      // console.log(res)
      this.setData({
        bookCount:res.result.data.length
      })
    }).catch((err) => {
      console.log(err)
    })
    wx.hideLoading()
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

  // getMyFavor() {
  //   classicModel.getMyFavor(res => {
  //     console.log(res)
  //     this.setData({
  //       classics: res
  //     })
  //   })

  // },

  // getMyBookCount() {
  //   bookModel.getMyBookCount()
  //     .then(res => {
  //       this.setData({
  //         bookCount: res.count
  //       })
  //     })
  // },

  // userAuthorized1() {
  //   promisic(wx.getSetting)()
  //     .then(data => {
  //       if (data.authSetting['scope.userInfo']) {
  //         return promisic(wx.getUserInfo)()
  //       }
  //       return false
  //     })
  //     .then(data => {
  //       if (!data) return
  //       this.setData({
  //         authorized: true,
  //         userInfo: data.userInfo
  //       })
  //     })
  // },


  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },



  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onJumpToDetail(event) {
    console.log(event)
    const cid = event.detail.cid
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/page5/page5?cid=${cid}`
    })
  },
  OnTohistory() {
    wx.navigateTo({
      url: '/pages/template/template',
    })
  }


})