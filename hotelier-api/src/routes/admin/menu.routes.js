const express=require('express');
const router=express.Router();
const multer=require('multer');
const upload=multer();
const {create,view,update,destroy}=require('../../controllers/admin/menu.controller');


module.exports=server=>{
   router.post('/create',upload.none(),create);
   router.post('/view',upload.none(),view);
   router.post('/update/:id',upload.none(),update);
   router.post('/delete',upload.none(),destroy);


    server.use('/api/admin/menu',router);
}