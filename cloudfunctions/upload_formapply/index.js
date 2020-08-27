// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const form_apply = db.collection('form_apply')
// 云函数入口函数
exports.main = async(event, context) => {
    // for (let i = 0, len = classic.length; i < len; i++) {
    await form_apply.add({
      data: {
        ...event.form,
        id : event.id,
        publish: event.publish,
        pubdate: event.pubdate,
        plate: event.plate,
        score: event.score,
        enddate: event.enddate,
        title: event.title
      }
    }).then((res) => {
      console.log('插入成功！');
    }).catch((err) => {
      console.log('插入失败！')

    })
}

// }