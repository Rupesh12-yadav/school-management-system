const mongoose =require("mongoose");
const attendanceSchema=new mongoose.Schema({
    student:{type:mongoose.Schema.Types.ObjectId, ref:"Student",require:true},
    date:Date,
    status:{type:String,enum:["Present","Absent"],default:"Present"},
    remarks: String
})
module.exports=mongoose.model("LeaveRequest",attendanceSchema);