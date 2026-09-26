const express=require('express');
const router=express.Router();
const multer=require('multer');
const {create}=require('../../controllers/website/newsletter.controller');
const upload=multer();

module.exports=server=>{
   
 
    router.post('/create',upload.none(),create);

    server.use('/api/website/newsletter',router);
}

