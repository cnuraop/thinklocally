var mongoose = require('mongoose');
var CategorySchema = require('./category');
var ProductSchema = require('./product');

// Category Schema
var ShopSchema = mongoose.Schema({
   
    shopname: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    address:{
      type: String,
      required: true
    },
    phonenumber:{
      type:String
    },
    products:{
      type:String
    },
    categories:{
    type:String
    },
    ratings:{
     type:Number
    },
    location:{
    type:[Number]
    }
        
});

var Shop = module.exports = mongoose.model('Shop', ShopSchema);

