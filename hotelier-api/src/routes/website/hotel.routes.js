const express=require('express');
const router=express.Router();
const multer=require('multer');
const {view,details}=require('../../controllers/website/hotel.controller');
const path=require('path');

module.exports=server=>{
   
    const storage= multer.diskStorage({
        destination:function(request,file,callback){
            callback(null,'uploads/hotel');
        },
        filename:function(request,file,callback){
            callback(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
        }
    })  

    const upload=multer({storage:storage});
      const singleMultiple = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 6 }])


   
    router.post('/view',upload.none(),view);
    router.post('/details',upload.none(),details);
   
    server.use('/api/website/hotel',router);
}
