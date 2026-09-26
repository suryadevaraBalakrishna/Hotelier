const express=require('express');
const router=express.Router();
const multer=require('multer');
const {create,view,update}=require('../../controllers/admin/setting.controller');
const path=require('path');

module.exports=server=>{
   
    const storage= multer.diskStorage({
        destination:function(request,file,callback){
            callback(null,'uploads/setting');   
        },
        filename:function(request,file,callback){
            callback(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
        }
    })  

    const upload=multer({storage:storage});

    router.post('/create',upload.single('logo'),create);
    router.post('/view',upload.none(),view);
    router.post('/update',upload.single('logo'),update);
  
    server.use('/api/admin/setting',router);
}

