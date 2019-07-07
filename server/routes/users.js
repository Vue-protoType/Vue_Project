var express = require('express')
var router = express.Router()
var User = require('./../models/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})
// 登录操作
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err || doc === null) {
      res.json({
        status: '1',
        msg: '登录失败'
      })
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 60
        })
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 60
        })
        res.cookie('userPwd', doc.userPwd, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName,
            userPwd: doc.userPwd
          }
        })
      }
    }
  })
})
// 登出操作
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})
// cookies避免重新登录
router.post('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})
// 购物车列表加载
router.get('/cartList', function (req, res, next) {
  var userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          mag: '',
          result: doc.cartList
        })
      }
    }
  })
})
// 删除单项商品
router.post('/cart/del', function (req, res, next) {
  var userId = req.cookies.userId
  var productId = req.body.productId
  User.update({userId: userId}, {$pull: {'cartList': {'productId': productId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.methods,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})
// 改变商品的数量
router.post('/cart/edit', function (req, res, next) {
  var userId = req.cookies.userId
  var productId = req.body.productId
  var productNum = req.body.productNum
  var checked = req.body.checked
  User.update({'userId': userId, 'cartList.productId': productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})
// 改变商品的选中状态
router.post('/editCheckAll', function (req, res, next) {
  var userId = req.cookies.userId
  var checkAll = req.body.checkAll
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        doc.cartList.forEach((item) => {
          item.checked = checkAll
        })
        doc.save(function (err, result) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'success'
            })
          }
        })
      }
    }
  })
})
// 地址查询
router.get('/addressList', function (req, res, next) {
  var userId = req.cookies.userId
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      })
    }
  })
})
// 设置默认地址
router.post('/SetDefault', function (req, res, next) {
  var userId = req.cookies.userId
  var addressId = req.body.addressId
  if (!addressId) {
    res.json({
      status: '1003',
      msg: '',
      result: '没有传入值'
    })
  } else {
    User.findOne({userId: userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: '查询失败'
        })
      } else {
        var addressList = doc.addressList
        addressList.map((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true
          } else {
            item.isDefault = false
          }
        })
        doc.save(function (err, result) {
          if (err) {
            res.json({
              status: '1004',
              msg: err.message,
              result: '保存失败'
            })
          } else {
            res.json({
              status: '1005',
              msg: '',
              result: '保存成功'
            })
          }
        })
      }
    })
  }
})
// 删除地址
router.post('/deleteAddress', function (req, res, next) {
  var userId = req.cookies.userId
  var addressId = req.body.addressId
  User.update({userId: userId}, {$pull: {'addressList': {'addressId': addressId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '',
        result: '删除失败'
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '删除成功'
      })
    }
  })
})
// 增加地址
router.post('/addAddress', function (req, res, next) {
  var userId = req.cookies.userId
  var addressId = req.body.addressId
  var postCode = req.body.postCode
  var streetName = req.body.streetName
  var userName = req.body.userName
  var docx = {}
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '查询失败'
      })
    } else {
      docx.addressId = addressId
      docx.postCode = postCode
      docx.streetName = streetName
      docx.userName = userName
      docx.isDefault = false
      docx.tel = ''
      console.log(docx)
      doc.addressList.push(docx)
      doc.save(function (err1, result) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: '保存失败'
          })
        } else {
          res.json({
            status: '2',
            msg: '',
            result: '保存成功'
          })
        }
      })
    }
  })
})
// 订单成功
router.post('/payment', function (req, res, next) {
  var userId = req.cookies.userId
  var orderTotal = req.body.orderTotal
  var addressId = req.body.addressId
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var address = ''
      var goodsList = []
      doc.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item
        }
      })
      doc.cartList.filter((item) => {
        if (item.checked === '1') {
          goodsList.push(item)
        }
      })
      var orderId = ''
      for (var i = 0; i < 10; i++) {
        var r1 = Math.floor(Math.random() * 10)
        orderId += r1 + ''
      }
      var SimpleDateFormat = function (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var minute = date.getMinutes()
        minute = minute < 10 ? ('0' + minute) : minute
        var second = date.getSeconds()
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      }
      var order = {
        orderId: orderId,
        orderTotal: parseInt(orderTotal),
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: SimpleDateFormat(new Date())
      }
      doc.orderList.push(order)
      doc.save(function (err1, result) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: '产生订单失败'
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
    }
  })
})
// 根据订单ID查询订单
router.post('/orderDetail', function (req, res, next) {
  var userId = req.cookies.userId
  var orderId = req.body.orderId
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var data = ''
      doc.orderList.map((item) => {
        if (item.orderId === orderId) {
          data = item
        }
      })
      res.json({
        status: '0',
        msg: '',
        result: data
      })
    }
  })
})
module.exports = router
