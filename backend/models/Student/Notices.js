const mongoose = require('mongoose');
const { title } = require('process');
const { MessagePort } = require('worker_threads');
const noticeSchema=new mongoose.Schema({
    title:String,
    message:String,
    date:{ type:Date, default:Date.now},
     audience:{type:String,enum:["student","teacher","all"],default:"all"}

});
module.exports=mongoose.model("Notice",noticeSchema);