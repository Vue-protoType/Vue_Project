var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var ProductSchema = new Schema({
  'productId': String,
  'productName': String,
  'salePrice': Number,
  'productImg': String,
  'saleNum':Number,
  'checked':String
});
module.exports = mongoose.model('Good', ProductSchema);
