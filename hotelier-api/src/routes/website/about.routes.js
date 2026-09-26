const express=require('express');
const router=express.Router();
const multer=require('multer');
const {view}=require('../../controllers/website/about.controller');
const path=require('path');

module.exports=server=>{
   
    const storage= multer.diskStorage({
        destination:function(request,file,callback){
            callback(null,'uploads/about');   
        },
        filename:function(request,file,callback){
            callback(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
        }
    })  

    const upload=multer({storage:storage});

    router.post('/view',upload.none(),view);
  

    server.use('/api/website/about',router);
}




