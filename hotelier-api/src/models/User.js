const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
       required: [true, 'name is required'],
    },
     image:{
        type: String,
        default:''
    },
     password:{
        type: String,
        default:'',
        required: [true, 'password is required'],
    },
    email:{
        type: String,
        default:'',
        required: [true, 'email is required'],
    },
    mobile_number:{
        type: String,
        default:'',
    },
    role_type:{
        type:String,   
        required:[true, 'Type is required'],
        enum:['Admin','User']
    },
    order: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
     
})

const userModal=mongoose.model('users',userSchema);
module.exports=userModal;
  