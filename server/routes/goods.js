var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')
mongoose.connect('mongodb://127.0.0.1:27017/db_demo')
mongoose.connection.on('connected', function () {
  console.log('MongoDB connection success')
})
mongoose.connection.on('error', function () {
  console.log('MongoDB connection fail')
})
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connection disconnected')
})

// 查询物品数据
router.get('/list', function (req, res, next) {
  var page = parseInt(req.param('page'))
  var sort = req.param('sort')
  var rang = req.param('rang')
  var priceGt = ''
  var priceLt = ''
  // 前端传入index,然后用switch，对搜索值再确定
  if (rang !== 'All') {
    switch (rang) {
      case '0': priceGt = 0; priceLt = 100; break
      case '1': priceGt = 100; priceLt = 500; break
      case '2': priceGt = 500; priceLt = 1000; break
      case '3': priceGt = 1000; priceLt = 5000; break
    }
  }
  var params = {}
  var pageSize = parseInt(req.param('pageSize'))
  var skip = (page - 1) * pageSize// 分页跳过几条，第一页不跳过，第二页跳过8条
  // 前端传值是升序还是降序
  if (priceGt !== '' && priceLt !== '') {
    params = {
      salePrice: {
        $gt: priceGt, // 在mongo数据库里搜索大于priceGt，小于priceLt的值
        $lt: priceLt
      }
    }
  }
  var goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({'salePrice': sort})
  goodsModel.exec({}, function (err, doc) {
    if (err) {
      res.json(
        {
          status: '1',
          msg: err.message
        }
      )
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})
// 加入到购物车
router.post('/addCart', function (req, res, next) {
  var userId = '100000077' // 用户的ID
  var productId = req.body.productId // 商品的ID
  var User = require('../models/users')
  // 根据UserId查找，找到用户的信息
  User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({status: '1', msg: err.message})
    } else {
      if (userDoc) {
        var GoodsItem = '' // 这个是暂存数据的变量
        userDoc.cartList.map(function (item) { // map遍历相应用户的购物车列表信息，如果列表中含有该物品，productNum+1既可,将列表里对应的商品信息暂存到这里，说明信息是存在的
          if (item.productId === productId) {
            GoodsItem = item
            item.productNum++
          }
        })
        if (GoodsItem) { // 如果GoodsItem存在,则将productNum+1保存
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({status: '1', msg: err2.message})
            } else {
              res.json({status: '0', msg: '插入成功', result: 'suc'})
            }
          })
        } else {
          Goods.findOne({productId: productId}, function (err1, doc) {
            if (err1) {
              res.json({status: '1', msg: err1.message})
            } else {
              if (doc) {
                var docx = doc.toObject() // 将mongoose的对象转换成js的对象，mongoose的对象具有特殊性,这里是说明购物车列表第一次出现该商品，给他定初值
                docx.productNum = 1
                docx.checked = 1
                userDoc.cartList.push(docx)
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({status: '1', msg: err2.message})
                  } else {
                    res.json({status: '0', msg: '插入成功', result: 'suc'})
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})
module.exports = router
