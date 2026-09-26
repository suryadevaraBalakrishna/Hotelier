const mongoose=require('mongoose');

const aboutSchema=new mongoose.Schema({
    image:{
        type:String,
        required:[true,'image is required']
    },
    sub_heading:{
        type:String,
        required:[true,'subheading is required']
    },
    heading:{
        type:String,
        required:[true,'heading is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    button_txt:{
        type:String,
        required:[true,'button text is required']
    },
    button_link:{
        type:String,
        required:[true,'button link is required']
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

const aboutModal=mongoose.model('About',aboutSchema);
module.exports=aboutModal;