const mongoose=require('mongoose');
const examSchema=new mongoose.Schema({
    class:String,
    examName:String,
    subject:String,
    date:Date,
    time:String
});
module.exports=mongoose.model("ExamTimetable",examSchema);