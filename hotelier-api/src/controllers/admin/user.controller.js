require('dotenv').config();
const userModal = require('../../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const saltRounds=10;
const nodemailer = require('nodemailer');
const { request } = require('express');
const cloudinary = require("../../../config/cloudinary");

const uploadToCloudinary = (file, folder) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folder
            },
            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        stream.end(file.buffer);
    });
};

exports.register = async (request, response) => {

    var existingUser= await userModal.findOne({email:request.body.email,deletedAt:'',role_type:'Admin'});

    if(existingUser){
        const output = {
            _status: false,
            _message: "Email already exists",
            _data: null,
        }
        response.send(output);
    }


    const data={
        name:request.body.name,
        email:request.body.email,
        password: await bcrypt.hash(request.body.password, saltRounds),
        mobile_number:request.body.mobile_number,
        role_type:'User',
    }

    // if(request.file){
    //     data.image=request.file.filename;
    // }

  
    if (request.file) {

    const result = await uploadToCloudinary(
        request.file,
        "hotelier/users"
    );

    data.image = result.secure_url;


  
}

     try {

        const user = new userModal(data);
        await user.save()
            .then((result) => {
             var token=jwt.sign({userData:result},process.env.KEY_VALUE);

                const output = {
                    _status: true,
                    _message: "Record inserted successfully",
                    _token: token,
                    _data: result,
                }

                response.send(output);
            })
            .catch((error) => {
                var errorMessage = [];
                for (err in error.errors) {
                    errorMessage.push(error.errors[err].message);
                }
                const output = {
                    _status: false,
                    _message: "Record not inserted",
                    _error: errorMessage,
                    _data: null,
                }
                response.send(output);
            })

    }
    catch (error) {
        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }

}


exports.login = async (request, response) => {
   
   var existingUser=await userModal.findOne({email:request.body.email,deletedAt:'',role_type:'Admin'});

   if(!existingUser){
       const output = {
           _status: false,
           _message: "Invalid email",
           _data: null,
       }
       response.send(output);
       return;
   }

   if(await bcrypt.compare(request.body.password, existingUser.password)){
        var token=jwt.sign({userData:existingUser},process.env.KEY_VALUE);

        if(existingUser.status==false){
            const output = {
                _status: false,
                _message: "Your account is inactive",
                _data: null,
            }
            response.send(output);
            return;
        }
         
        const output = {
            _status: true,
            _message: "Login successful",
            _token: token,
            _data: existingUser,
        }
        response.send(output);
   
   }else{
        
        const output = {
            _status: false,
            _message: "Invalid password",
            _data: null,
        }
        response.send(output);
   }
   
}


exports.ViewProfile = async (request, response) => {

    var token=request.headers.authorization;
    
    if(!token){ 
        const output = {
            _status: false,
            _message: "Token is required",
            _data: null,
        }
        response.send(output);
        return;
    }

    token=token.split(" ")[1];

    try{
        var decoded=jwt.verify(token,process.env.KEY_VALUE);

        var userData=await userModal.findOne({_id:decoded.userData._id,deletedAt:'',role_type:'Admin'});
          
        if(!userData){
            const output = {
                _status: false,
                _message: "Admin not found",
                _data: null,
            }
            response.send(output);
            return;
        }else{
            const output = {
                _status: true,
                _message: "Admin profile fetched successfully",
                _user_image_path: process.env.user_setting_image_path,
                _data: userData,
            }
            response.send(output);
        }


    }catch(error){
         const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }
        response.send(output);
    }

}


exports.ViewAll=async(request,response)=>{

    await userModal.find()
          .then((result)=>{
            if(result.length > 0){
                   const output = {
                _status: true,
                _message: "Profile fetched successfully",
                _user_image_path: process.env.user_setting_image_path,
                _data: result,
            }
            response.send(output);
                
            }else{
                const output = {
                    _status: false,
                    _message: 'No Record Found',
                    _data: null
                }

                response.send(output);
            }
            
          }).catch(()=>{
             const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }
        response.send(output);
    })    

}


exports.UpdateProfile = async (request, response) => {
 
    var token=request.headers.authorization;

    if(!token){
        const output = {
            _status: false,
            _message: "Token is required",
            _data: null,
        }
        response.send(output);
        return;
    }

    token=token.split(" ")[1];

    try{
        var decoded=jwt.verify(token,process.env.KEY_VALUE);

        var userData=await userModal.findOne({_id:decoded.userData._id,deletedAt:'',role_type:'Admin'});
          
        if(!userData){
            const output = {
                _status: false,
                _message: "Admin not found",
                _data: null,
            }
            response.send(output);
            return;
        }

        var updateData={
            name:request.body.name,
            email:request.body.email,
            mobile_number:request.body.mobile_number,
        }

        // if(request.file){
        //     updateData.image=request.file.filename;
        // }

      if (request.file) {

    const result = await uploadToCloudinary(
        request.file,
        "hotelier/users"
    );

    updateData.image = result.secure_url;

}

        var updatedUser=await userModal.updateOne({_id:decoded.userData._id},{$set:updateData})
        .then((result) =>{
            const output = {
                _status: true,
                _message: "Profile updated successfully",   
                _data: result,
            }
            response.send(output);
        }).catch((error) =>{
            const output = {
                _status: false,
                _message: "Profile not updated",
                _error: error.message,
                _data: null,
            }
            response.send(output);
        }   
    )
    }catch(error){
        const output = {
            _status: false,
            _message: "Invalid token",
            _error: error.message,
            _data: null,
        }
        response.send(output);
        return;
    }



}


exports.ChangePassword = async (request, response) => {
  var token=request.headers.authorization;

    if(!token){
        const output = {
            _status: false,
            _message: "Token is required",
            _data: null,
        }
        response.send(output);
        return;
    }

    token=token.split(" ")[1];

    try{
        var decoded=jwt.verify(token,process.env.KEY_VALUE);

        var userData=await userModal.findOne({_id:decoded.userData._id,deletedAt:'',role_type:'Admin'});
          
        if(!userData){
            const output = {
                _status: false,
                _message: "Admin not found",
                _data: null,
            }
            response.send(output);
            return;
        }

        var verifyPassword=await bcrypt.compare(request.body.current_password, userData.password);

        if(!verifyPassword){
            const output = {
                _status: false,
                _message: "Current password is incorrect",
                _data: null,
            }
            response.send(output);
            return;
        }

        if(request.body.current_password==request.body.new_password){
            const output = {
                _status: false,
                _message: "New password cannot be the same as current password",
                _data: null,
            }
            response.send(output);
            return;
        }

        if(request.body.new_password !== request.body.confirm_password){
            const output = {
                _status: false,
                _message: "New password and confirm password do not match",
                _data: null,
            }
            response.send(output);
            return;
        }


        var passwoddHash=await bcrypt.hash(request.body.new_password, saltRounds);

        var updateData={
            password:passwoddHash,
        }
       
        var updatedUser=await userModal.updateOne({_id:decoded.userData._id},{$set:updateData})
        .then((result) =>{
            const output = {
                _status: true,
                _message: "Profile updated successfully",   
                _data: result,
            }
            response.send(output);
        }).catch((error) =>{
            const output = {
                _status: false,
                _message: "Profile not updated",
                _error: error.message,
                _data: null,
            }
            response.send(output);
        }   
    )
    }catch(error){
        const output = {
            _status: false,
            _message: "Invalid token",
            _error: error.message,
            _data: null,
        }
        response.send(output);
        return;
    }



}


exports.forgotPassword=async(request,response)=>{
      var existingUser = await userModal.findOne({ email: request.body.email, deleted_at:null,role_type:'Admin' })

    if (!existingUser) {
        const output = {
            _status: false,
            _message: 'Invalid Email',
            _data: null,
        }
        return response.send(output);
    }

    var token = jwt.sign({ userData: existingUser }, process.env.KEY_VALUE, {
        expiresIn: '1h'
    })

       // For production, replace with your actual SMTP server details.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

     const mailOptions = {
        from: 'Hotelier API' + process.env.EMAIL_USER,
        to: existingUser.email,
        subject: "Password Reset Request",
        text: `Click the link to reset your password: http://localhost:5173/reset-password?token=${token}`, // Plain-text version of the message
    };

   
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return response.send({
                _status: false,
                _message: 'Error sending email',
                _data: error
            });
        } else {
            return response.send({
                _status: true,
                _message: 'Password reset email sent successfully',
                _data: null
            });
        }
    });


}

exports.resetPassword=async(request,response)=>{
      var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
 

    try{
          var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData = await userModal.findOne({_id:decoded.userData._id,role_type:'Admin'});
          
        if (!userData) {
            const output = {
                _status: false,
                _message: 'Admin Not Found',
                _data: null
            }

            return response.send(output);
        }


         if (request.body.new_password != request.body.confirm_password) {
            const output = {
                _status: false,
                _message: 'Confirm Password and New password should be same',
                _data: null
            }

            return response.send(output);
        }

        var password = await bcrypt.hash(request.body.new_password, saltRounds);

          var updateUser = await userModal.updateOne({
            _id: decoded.userData._id
        }, {
            $set: {
                password: password
            }
        })

        const output = {
            _status: true,
            _message: 'Password Reset Successfuly',
            _data: updateUser
        }

        response.send(output);



    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null
        }

        return response.send(output);
    }

}
