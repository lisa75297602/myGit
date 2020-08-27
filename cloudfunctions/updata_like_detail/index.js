// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  console.log(event._id)
  console.log(event.fav_nums)
  await db.collection('activity_list').where({
    _id: event._id
  }).update({
    data: {
      fav_nums: event.fav_nums
    }
  }).then((res) => {
    console.log('更新成功')
  })
}