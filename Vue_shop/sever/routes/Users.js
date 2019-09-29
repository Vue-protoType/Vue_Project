require('../public/Tool/DateTool');
var express = require('express');
var router = express.Router();
var Users = require('../models/users');
//登录操作
router.post('/login',function (req,res,next) {

    var params = {
      userName:req.body.userName,
      userPwd:req.body.passWord
    };
  Users.findOne(params,function (findErr,findDoc) {
      if(findErr){
        res.json({
          status:'009',
          msg:findErr.message
        })
      }else{
        if(findDoc) {
          res.cookie('userId',findDoc.userId,{
            path:'/',
            maxAge:1000*60*60
          });
          res.cookie('userName',findDoc.userName,{
            path:'/',
            maxAge:1000*60*60
          });
          res.json({
            status: '010',
            msg: '用户登录成功',
            result: {
              userName: findDoc.userName,
            }
          })
        }else{
          res.json({
            status:'011',
            msg:'账号或者密码错误'
          })
        }
      }
    })
});
//退出操作
router.post('/logout',function (req,res,next) {
  res.cookie('userId','',{
    path: '/',
    maxAge: 0
  });
  res.json({
    status:'012',
    msg:'',
    result: ''
  })
});
//检测是否登录
router.get('/checkLogin',function (req,res,next) {
  if(req.cookies.userId){
      res.json({
        status:'014',
        msg:'',
        result:req.cookies.userName
      })
  }else{
    res.json({
      status:'015',
      msg:'未登录',
      result:''
    })
  }
});
//商品列表加载
router.get('/cartList',function (req,res,next) {
    var userId = req.cookies.userId;
    Users.find({userId:userId},function (GoodsErr,GoodsDoc) {
      if(GoodsErr){
        res.json({
          status:'016',
          msg:GoodsErr.message
        })
      }else{
        if(GoodsDoc) {
          res.json({
            status: '017',
            msg: '获取商品成功',
            result: GoodsDoc[0].cartList
          })
        }
      }
    })
});
//购物车删除
router.post('/cartList/delete',function (req,res,next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  Users.update({userId:userId},{$pull:{'cartList':{'productId':productId}}},function (deleteErr,deleteDoc) {
    if(deleteErr){
      res.json({
        status:'018',
        msg:deleteErr.message
      })
    }else{
      res.json({
        status:'019',
        msg:'删除成功',
        result:''
      })
    }
  })
});
//购物车修改
router.post('/cartList/update',function (req,res,next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  var productNum = req.body.productNum;
  var checked = req.body.checked;
  Users.update({userId:userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },function (updateErr,updateDoc) {
    if(updateErr){
      res.json({
        status:'020',
        msg:updateErr.message
      })
    }else{
      if(updateDoc) {
        res.json({
          status: '021',
          msg: '修改成功',
          result: ''
        })
      }
    }
  })
});
//购物车的全选功能
router.post('/cartList/checkAll', function (req, res, next) {
  var userId = req.cookies.userId;
  var checkAll = req.body.checkAll;
  Users.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '021',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        doc.cartList.forEach((item) => {
          item.checked = checkAll
        });
        doc.save(function (err, result) {
          if (err) {
            res.json({
              status: '022',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '023',
              msg: '',
              result: 'success'
            })
          }
        })
      }
    }
  })
});
//地址列表渲染
router.post('/AddressList',function (req,res,next) {
  var userId = req.cookies.userId;
  Users.find({userId:userId},function (findErr,findDoc) {
    if(findErr){
      res.json({
        status:'025',
        msg:findErr.message
      })
    }else{
      if(findDoc){
        res.json({
          status:'026',
          msg:'success',
          result:findDoc[0].addressList
        })
      }
    }
  })
});
//设置默认地址
router.post('/SetDefault', function (req, res, next) {
  var userId = req.cookies.userId;
  var addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '027',
      msg: '',
      result: '没有传入值'
    })
  } else {
    Users.findOne({userId: userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '028',
          msg: err.message,
          result: '查询失败'
        })
      } else {
        var addressList = doc.addressList;
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
              status: '029',
              msg: err.message,
              result: '保存失败'
            })
          } else {
            res.json({
              status: '030',
              msg: '',
              result: '保存成功'
            })
          }
        })
      }
    })
  }
});
//删除相应的地址
router.post('/deleteAddress',function (req,res,next) {
  var userId = req.cookies.userId;
  var addressId = req.body.addressId
  Users.update({userId:userId},{$pull:{'addressList':{'addressId':addressId}}},function (err,doc) {
    if(err){
      res.json({
        status:'031',
        msg:err.message
      })
    }else{
      if(doc){
        res.json({
          status:'033',
          msg:'删除成功',
          result:'success'
        })
      }
    }
  })
});
//添加新地址
router.post('/addAddress',function (req,res,next) {
  var userId = req.cookies.userId;
  var userName = req.body.userName;
  var postCode = req.body.postCode;
  var streetName = req.body.streetName;
  var telNum = req.body.telNum;
  Users.find({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'034',
        msg:err.message
      })
    }else{
      if(doc){
        console.log(doc)
        var Address = {
          'addressId': new Date() + Math.floor(Math.random()*10),
          'userName': userName,
          'streetName': streetName,
          'postCode': postCode,
          'tel': telNum,
          'isDefault': false
        };
        doc[0].addressList.push(Address);
        doc[0].save(function (saveErr,SaveDoc) {
          if(saveErr){
            res.json({
              status:'036',
              msg:saveErr.message
            })
          }else{
            res.json({
              status:'035',
              msg:'保存成功',
              result:'地址添加成功'
            })
          }
        })
      }
    }
  })

});
//创建订单
router.post('/payMenu',function (req,res,next) {
  var userId = req.cookies.userId;
  var orderTotal = req.body.orderTotal;
  var AddressId = req.body.AddressId;
  Users.findOne({userId:userId},function (findErr,findDoc) {
    if(findErr) {
      res.json({
        status: '036',
        msg: findErr.message
      })
    }else{
      if(findDoc){
        var orderAddress = '';
        var orderGoodsList = [];
        findDoc.addressList.forEach((item)=>{
          if(item.addressId === AddressId){
            orderAddress = item.streetName
          }
        });
        findDoc.cartList.forEach((item)=>{
          if(item.checked === '1'){
            orderGoodsList.push(item)
          }
        });
        var orderIdCode = new Date().Code(new Date());
        var createDate = new Date().format(new Date());
        var order={
          orderId:orderIdCode,
          orderTotal:orderTotal,
          orderAddress:orderAddress,
          orderGoodsList:orderGoodsList,
          orderStatus:'1',
          createDate:createDate
        };
        findDoc.orderList.push(order);
        findDoc.save(function (saveErr,saveDoc) {
          if(saveErr) {
            res.json({
              status: '037',
              msg: saveErr.message
            })
          }else{
            res.json({
              status:'038',
              msg:'订单创建成功',
              result:{
                orderId: order.orderId,
                orderTotal:order.orderTotal
              }
            })
          }
        })
      }
    }
  })

});
module.exports = router;
