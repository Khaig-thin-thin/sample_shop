const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const {isEmail}=require("validator");
const UserSchema = new Schema({
     username: {
          type:String,
          required:true,
          unique:true
     },
     email: {
          type:String,
          required:true,
          unique:true,
          validate:[isEmail, "Invalid email"]
     },
     password: {
          type:String,
          required:true
     
     },
     createdAt: {
          type:Date,
         default:Date.now
     },
     role: {
          type:String,
          enum: [ "user","admin"],
          default:"user"
     }
});
UserSchema.pre("save",async function(next){
     let salt = await bcrypt.genSalt();
     let hashedPw = await bcrypt.hash(this.password,salt);
     this.password = hashedPw;
     next();
})
const User = mongoose.model("users",UserSchema);
module.exports.User = User;