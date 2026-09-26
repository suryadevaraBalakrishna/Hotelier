const mongoose=require('mongoose');

const newsletterSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'email is required']
    },
     order:{
        type:Number,
        default:0,
    },
     status:{
        type:Boolean,
        default:true,
     },
     createdAt:{
        type:Date,
        default:Date.now,
     },
     updatedAt:{
        type:Date,
        default:Date.now,
     },
     deletedAt:{
        type:Date,
        default:null,
     }
})

const newsletterModal=mongoose.model('Newsletter',newsletterSchema);
module.exports=newsletterModal;