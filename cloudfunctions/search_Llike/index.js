// 云函数入口文件
const cloud = require('wx-server-sdk')
const MAX_LIMIT = 100
cloud.init()
const db = cloud.database()
const dbcollection = db.collection('classic')
// 云函数入口函数
exports.main = async(event, context) => {
  const countRes = await dbcollection.count()
  const total = countRes.total
  const caultNums = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < caultNums; i++) {
    let promise = db.collection('classic').where({
      like_status: 1
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  let list = {
    data: []
  }

  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) =>{
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  return list
  console.log(list)

}