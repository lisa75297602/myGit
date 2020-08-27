// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  await db.collection('classic').where({
    _id: event._id
  }).update({
    data: {
      like_status: event.like_status ? 0 : 1,
      fav_nums: event.like_status ? event.fav_nums - 1 : event.fav_nums + 1,
    }
  })
}