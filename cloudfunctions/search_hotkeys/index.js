// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
 const keys =  await db.collection('hot_keys').get().then((res)=>{
   return res
 })
 console.log(keys)
 return keys
}