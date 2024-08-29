const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const ProductSchema = new Schema({
     name: {
          type:String,
          required:true,
          index:true
     },
     price: {
          type:mongoose.Types.Decimal128,
          required:true,
          
     },
     img: {
          type:String,
          required:true
     
     },
     description: {
          type:String,
          required:true
     },
     createdAt: {
          type:Date,
         default:Date.now
     },
     isDeleted: { type: Boolean, default: false }
});

const Product = mongoose.model("product",ProductSchema);
module.exports= Product;

