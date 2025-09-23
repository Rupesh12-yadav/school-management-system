const express =require('express');
const router =express.Router();
const {registerAdmin,addTeacher,addStudent,getAnalytics,addEvent,createBeckup}=require("../controllers/adminController");
//Admin registration
router.post('/register',registerAdmin);
// Teacher management
router.post('/add-teacher',addTeacher);
//Student management
router.post('/add-student',addStudent);
// Analytics
router.get('/analytics',getAnalytics);
// School events / holidays
router.post('/add-event',addEvent);
// Backup / Export reports
router.post('/backup', createBackup);
module.exports=router;