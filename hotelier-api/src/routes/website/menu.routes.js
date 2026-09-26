const express=require('express');
const router=express.Router();
const multer=require('multer');
const upload=multer();
const {create,view,update,destroy}=require('../../controllers/website/menu.controller');


module.exports=server=>{
   router.post('/view',upload.none(),view);
   

    server.use('/api/website/menu',router);
}