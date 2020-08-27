// miniprogram/pages/page1/page1.js
var classics = null
var Index = 0
Component({

  /**
   * 页面的初始数据
   */

  properties: {
    cid: Number,
    type: Number
  },

  data: {
    classic: null,
    latest: false,
    first: false,
    likeCount: null,
    likeStatus: false,
    musicShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */


  attached(options) {
    const cid = this.properties.cid
    console.log(cid)
    if (Index === 0) {
      this.setData({
        latest: true
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'classic_search'
    }).then((res) => {
      // console.log(res.result.data)
      classics = cid === Index ? res.result.data[Index] : res.result.data[cid]
      if (classics.type === 200) {
        this.setData({
          classic: cid === Index ? res.result.data[Index] : res.result.data[cid],
          musicShow: true
        })
      } else {
        this.setData({
          classic: cid === Index ? res.result.data[Index] : res.result.data[cid],
          musicShow: false
        })
      }
    })
    wx.hideLoading()
  },

  methods: {
    _refresh: function () {
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'classic_search'
      }).then((res) => {
        // console.log(res.result.data)
        classics = res.result.data[classics.id]
        if (classics.type === 200) {
          this.setData({
            classic: res.result.data[classics.id],
            musicShow: true
          })
        } else {
          this.setData({
            classic: res.result.data[classics.id],
            musicShow: false
          })
        }
      })
      wx.hideLoading()
    },
    onLike: function (event) {
      console.log(event)
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'updata_classic',
        data: {
          like_status: classics.like_status,
          fav_nums: classics.fav_nums,
          _id: classics._id,
        }
      }).then((res) => {
        console.log(res)
        console.log('更新完成！')
      }).catch((err) => {
        console.log('失败的操作！')
        console.log(err)
      })
      wx.hideLoading()
      this._refresh()
      // console.log(event)
    },

    onNext: function (event) {
      this.setData({
        musicShow: false
      })
      if (Index === 1) {
        this.setData({
          latest: true,
        })
        // }else{
        //   this.setData({
        //     latest:false
        //   })
      } else {
        this.setData({
          first: false
        })
      }
      Index = Index - 1
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'classic_search'
      }).then((res) => {
        // console.log(res.result.data)
        classics = res.result.data[Index]
        if (classics.type === 200) {
          this.setData({
            classic: res.result.data[Index],
            musicShow: true
          })
        } else {
          this.setData({
            classic: res.result.data[Index],
            musicShow: false
          })
        }

      })
      wx.hideLoading()
    },

    onPrevious: function (event) {
      this.setData({
        musicShow: false
      })
      if (Index === 6) {
        this.setData({
          first: true
        })
      }
      Index = Index + 1
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'classic_search'
      }).then((res) => {
        // console.log(res.result.data)
        classics = res.result.data[Index]
        if (classics.type === 200) {
          this.setData({
            classic: res.result.data[Index],
            musicShow: true
          })
        } else {
          this.setData({
            classic: res.result.data[Index],
            musicShow: false
          })
        }
      })
      wx.hideLoading()
      if (Index != 0) {
        this.setData({
          latest: false
        })
      }
    },
  }
})