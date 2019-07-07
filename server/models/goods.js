var mongoose = require('mongoose')
var Schema =  mongoose.Schema
var ProductSchema = new Schema({
  'productId': String,
  'productName': String,
  'salePrice': Number,
  'productImg': String
})
module.exports = mongoose.model('Good', ProductSchema)
