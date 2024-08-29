const mongoose = require("mongoose");
 
const uri = "mongodb://127.0.0.1:27017/expressDB";
 
function db_connect(){
    return mongoose.connect(uri);
}
 
mongoose.connection.once("connected",()=>{
    console.log("Connected to MongoDB");
});
 
mongoose.connection.on("error",(err)=>{
    console.log("MongoDB Connection Failed");
    console.log(err);
});
 
module.exports = db_connect;