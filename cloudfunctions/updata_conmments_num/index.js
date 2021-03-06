// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  await db.collection('activity_comments').where({
    id: event.id
  }).update({
    data: {
      comments: event.comments
    }
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}