// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activity:Object,
    showLike:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      const bid = this.properties.activity.id
      const _id = this.properties.activity._id
      const fav_nums = this.properties.activity.fav_nums
      wx.navigateTo({
        url: `/pages/page3/page3?bid=${bid}&&fav_nums=${fav_nums}&&_id=${_id}`
      })
      // 降低了组件的通用性
      // 非常方便
      // 服务于当前的项目 项目组件
      // 
    }
  }
})
