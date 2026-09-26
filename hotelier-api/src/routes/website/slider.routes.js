const express=require('express');
const router=express.Router();
const multer=require('multer');
const {view}=require('../../controllers/website/slider.controller');
const upload=multer();

module.exports=server=>{


  
    router.post('/view',upload.none(),view);
    server.use('/api/website/slider',router);
}