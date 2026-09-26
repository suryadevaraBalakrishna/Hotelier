const express=require('express');
const router=express.Router();
const multer=require('multer');
const {create,view,update}=require('../../controllers/admin/about.controller');
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

    router.post('/create',upload.single('image'),create);
    router.post('/view',upload.none(),view);
    router.post('/update',upload.single('image'),update);

    server.use('/api/admin/about',router);
}




