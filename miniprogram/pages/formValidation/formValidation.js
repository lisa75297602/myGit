var formId = null
var publish = null
var pubdate = null
var plate = null
var score = null
var enddate = null
var title = null
const form = require("../../components/utils/formValidation.js")
Page({
  data: {

  },
  onLoad: function(options) {
    // console.log(options)
    formId = options.id
    publish = options.publish
    pubdate = options.pubdate
    plate = options.plate
    score = options.score
    enddate = options.enddate
    title = options.title
    // console.log(formId)
  },
  formSubmit: function(e) {
    //表单规则
    let rules = [{
      name: "name",
      rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
      msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
    }, {
      name: "sex",
      rule: ["required"],
      msg: ["请选择性别"]
    }, {
      name: "classNum",
      rule: ["required", "isNum", "range:[2000000,2999999]"],
      msg: ["请输入班级号", "请输入正确的班级号", "请输入正确的班级号范围：0-2999999,例如：02131801"]
    }, {
      name: "mobile",
      rule: ["required", "isMobile"],
      msg: ["请输入手机号", "请输入正确的手机号"]
    }, {
      name: "chracter",
      rule: ["required", "isChinese", "minLength:2", "maxLength:6"],
      msg: ["请输入活动角色", "请输入参与者或者观众"]
    }, {
      name: "fudaoyuan",
      rule: ["required", "isChinese", "minLength:2", "maxLength:6"],
      msg: ["请输入辅导员姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
    }, {
      name: "learnNum",
      rule: ["required", "isNum", "range:[2000000000,2099999999]"],
      msg: ["请输入学号", "请输入正确的学号", "请输入正确的学号范围：0-2099999999"]
    }, {
      name: "learnNum2",
      rule: ["required", "isSame:learnNum"],
      msg: ["请输入确认学号", "两次输入的学号不一致"]
    }, {
      name: "emotions",
      rule: ["required", "isChinese", "maxLength:50"],
      msg: ["请输入区间活动感想", "请输入不得超过50字之间的感想"]
    }, {
      name: "service",
      rule: ["required", "isChinese", "maxLength:50"],
      msg: ["请输入建议", "请输入不得超过50字之间的感想"]
    }];
    //进行表单检查
    let formData = e.detail.value;
    let checkRes = form.validation(formData, rules);
    if (!checkRes) {
      // console.log(formData)
      wx.showLoading({
        title: '上传中',
      })
      wx.cloud.init()
      wx.cloud.callFunction({
        name: "upload_formapply",
        data: {
          form: formData,
          id: formId,
          publish: publish,
          pubdate: pubdate,
          plate: plate,
          score: score,
          enddate: enddate,
          title: title,
        }
      }).then((res) => {
        // console.log("上传成功")
        wx.showToast({
          title: "提交成功!",
          icon: "none"
        })
        setTimeout(function() {
          //要延时执行的代码
          wx.navigateBack({
            delta: 1
          })
        }, 1000) //延迟时间 这里是1秒

      }).catch((err) => {
        console.log(err)
        wx.showToast({
          title: "提交失败!",
          icon: "none"
        })
      })
      wx.hideLoading()

      // wx.navigateBack({
      //   delta:1
      // })
    } else {
      wx.showToast({
        title: checkRes,
        icon: "none"
      });
    }
  },
  formReset: function(e) {
    console.log("清空数据")
  }
})