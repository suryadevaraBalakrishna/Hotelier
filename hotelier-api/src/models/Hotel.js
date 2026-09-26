const mongoose=require('mongoose');

const hotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    slug: {
        type: String,
        unique: true
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    images: {
        type: Array,
        default: []
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    location:{
        type:String,
        required:[true,'location is required']
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

const hotelModal=mongoose.model('Hotel',hotelSchema);
module.exports=hotelModal;