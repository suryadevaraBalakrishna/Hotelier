const mongoose=require('mongoose');

const settingSchema=new mongoose.Schema({
    sitename:{
        type:String,
        required:[true,'sitename is required']
    },
    logo:{
        type:String,
        required:[true,'logo is required']
    },
    phone:{
        type:String,
        required:[true,'phone is required']
    },
    email:{
          type:String,
        required:[true,'email is required']
    },
    address:{
          type:String,
        required:[true,'address is required']
    },
    social_links:{
        facebook:{
            type:String,
            required:[true,'facebook link is required']
        },
        twitter:{
            type:String,
            required:[true,'twitter link is required']
        },
        instagram:{
            type:String,        
            required:[true,'instagram link is required']
        },
        youtube:{  
            type:String,
            required:[true,'youtube link is required']
        },
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


const settingModal=mongoose.model('website-setting',settingSchema);
module.exports=settingModal;