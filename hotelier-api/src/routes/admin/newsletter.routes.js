const express=require('express');
const router=express.Router();
const multer=require('multer');
const {view}=require('../../controllers/admin/newsletter.controller');
const upload=multer();

module.exports=server=>{
   
 
    router.post('/view',upload.none(),view);

    server.use('/api/admin/newsletter',router);
}

