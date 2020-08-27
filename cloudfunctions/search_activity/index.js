// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// const coll = db.collection('booklist')
// 云函数入口函数
exports.main = async(event, context) => {
  const keywords = event.keywords
  let w = {}
  if (keywords.trim() != '') {
    w = {
      title: db.RegExp({
        regexp: keywords,
        options: 'i'
      }),
    }
  }

  return await db.collection('activity_list').where(w).get().then((res) => {
    return res
  })
}