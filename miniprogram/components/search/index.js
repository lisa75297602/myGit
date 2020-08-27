// components/search/index.js
// import {
//   KeywordModel
// } from '../../models/keyword.js'

// import {
//   BookModel
// } from '../../models/book.js'
var keywords = ''
import {
  paginationBev
} from '../behaviors/pagination.js'

// const keywordModel = new KeywordModel()
// const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
      // true, true, true,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotWords: [],
    searching: false,
    loading: false,
    loadingCenter: false,
    activitys: null,
    nulls: false
  },

  attached() {
    // console.log(q)
    // this.setData({
    //   historyWords: keywordModel.getHistory()
    // })

    wx.cloud.init()
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'search_hotkeys'
    }).then((res) => {
      console.log(res)
      this.setData({
        hotWords: res.result.data[0].hot
      })
    })
    wx.hideLoading()
    // keywordModel.getHot().then(res => {
    //   console.log(res)
    //   this.setData({
    //     hotWords: res.hot
    //   })
    // })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput: function(event) {
      keywords = event.detail.value
    },
    // loadMore() {
    //   if (!this.data.q) {
    //     return
    //   }
    //   if (this.isLocked()) {
    //     return
    //   }
    //   if (this.hasMore()) {
    //     this.locked()
    //     bookModel.search(this.getCurrentStart(), this.data.q)
    //       .then(res => {
    //         this.setMoreData(res.books)
    //         this.unLocked()
    //       }, () => {
    //         this.unLocked()
    //       })
    //     // 死锁
    //   }
    // },


    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      console.log(keywords)
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'search_activity',
        data: {
          keywords: keywords
        }
      }).then((res) => {
        console.log(res.result)
        if (res.result.data.length === 0) {
          this.setData({
            nulls: true
          })
        } else {
          this.setData({
            activitys: res.result.data
          })
        }
      })
      // // this.initialize() 
      // const q = event.detail.value || event.detail.text
      // this.setData({
      //   q
      // })
      // bookModel.search(0, q)
      //   .then(res => {
      //     this.setMoreData(res.books)
      //     this.setTotal(res.total)
      //     keywordModel.addToHistory(q)
      this._hideLoadingCenter()
      //   })
    },
    onConfirm2(event) {
      // this._showResult()
      // this._showLoadingCenter()
      // console.log(event.detail.text)
      this._showResult()
      this._showLoadingCenter()
      // console.log(keywords)
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'search_activity',
        data: {
          keywords: event.detail.text
        }
      }).then((res) => {
        console.log(res.result)
        if (res.result.data.length === 0) {
          this.setData({
            nulls: true
          })
        } else {
          this.setData({
            activitys: res.result.data
          })
        }
      })
      // // this.initialize() 
      // const q = event.detail.value || event.detail.text
      // this.setData({
      //   q
      // })
      // bookModel.search(0, q)
      //   .then(res => {
      //     this.setMoreData(res.books)
      //     this.setTotal(res.total)
      //     keywordModel.addToHistory(q)
      this._hideLoadingCenter()
      //   })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }

    // onReachBottom(){
    //   console.log(123123)
    // }

    // scroll-view | Page onReachBottom

  }
})