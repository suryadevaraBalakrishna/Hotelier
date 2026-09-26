const mongoose=require('mongoose');

const sliderSchema=new mongoose.Schema({
    sub_heading:{
        type:String,
        required:[true,'subheading is required']
    },
    heading:{
        type:String,
        required:[true,'heading is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    button_txt:{
        type:String,
        required:[true,'button text is required']
    },
    button_link:{
        type:String,
        required:[true,'button link is required']
    },
    second_btn_txt:{
        type:String,
        required:[true,'second button text is required']
    },
    second_btn_link:{
        type:String,
        required:[true,'second button link is required']
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

const sliderModal=mongoose.model('Slider',sliderSchema);
module.exports=sliderModal;