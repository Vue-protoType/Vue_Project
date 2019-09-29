var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/db_demo');
mongoose.connection.on("connected",function () {
  console.log('数据库连接成功')
});
mongoose.connection.on("error",function () {
  console.log('数据库连接失败')
});
mongoose.connection.on("disconnected",function () {
  console.log('数据库连接断开')
});
/* 查询商品列表 */
router.get('/list', function(req, res, next) {
  var params = {};
  let page = parseInt(req.param('page'));
  let pageSize =parseInt(req.param('pageSize'));
  let skip = (page-1)*pageSize;
  let priceGt = '';
  let priceLt = '';
  let range = req.param('activeState');
  if (range !== 'All') {
    switch (range) {
      case '0':priceGt = 0;priceLt=500;break;
      case '500':priceGt = 500;priceLt=1000;break;
      case '1000':priceGt =1000;priceLt=2000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLt
      }
    };
  }else{
    params = {};
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

  goodsModel.exec(function (err,doc) {
      if(err){
        res.json({
          status: '000',
          msg:err.message
        })
      }else{
        res.json({
          status: '001',
          msg: '获取数据成功',
          result:doc
        })
      }
  });
});
/* 加入购物车 */
router.post('/addCart',function (req,res,next) {
  var userId = '100000077';
  var productId = req.body.productId;
  var User = require('../models/users');
  var GoodsOwnFlag = false;
  User.findOne({userId:userId},function (UserErr,UserDoc) {
      if(UserErr){
        res.json({
          status:'002',
          msg:UserErr.message
        })
      }else{
        if(UserDoc){
          UserDoc.cartList.map(item=>{
            if(item.productId === productId){
              GoodsOwnFlag = true;
              item.productNum ++
            }
          });
          if(GoodsOwnFlag){
            UserDoc.save(function (NoFirstErr,NoFirstDoc) {
              if(NoFirstErr){
                res.json({
                  status:'008',
                  msg:NoFirstErr.message
                })
              }else{
                res.json({
                  status:'009',
                  msg:'非第一次添加该商品,保存成功',
                  result:'success'
                })
              }
            })
          }else{
            Goods.findOne({productId:productId},function (GoodsErr,GoodsDoc) {
              if(GoodsErr){
                res.json({
                  status:'003',
                  msg:GoodsErr.message
                })
              }else{
                if(GoodsDoc){
                  var GoodsDocX = GoodsDoc.toObject();
                  GoodsDocX.productNum = 1;
                  GoodsDocX.checked = 1;
                  UserDoc.cartList.push(GoodsDocX);
                  UserDoc.save(function (SaveErr,SaveDoc) {
                    if(SaveErr){
                      res.json({
                        status:'004',
                        msg:SaveErr.message
                      })
                    }else{
                      res.json({
                        status:'005',
                        msg:'第一次添加该商品,保存成功',
                        result:'success'
                      })
                    }
                  })
                }
              }
            })
          }
        }
      }
  })
});
module.exports = router;
