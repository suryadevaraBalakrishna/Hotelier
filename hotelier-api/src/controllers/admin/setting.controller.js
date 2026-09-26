const settingModal = require("../../models/Setting");
const cloudinary = require("../../../config/cloudinary");
require('dotenv').config();
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



// exports.create=async(request,response)=>{
//     try{
//         const data={
//             logo:request.file.filename,
//             sitename:request.body.sitename,
//             email:request.body.email,
//             phone:request.body.phone,
//             social_links:request.body.social_links,
//             address:request.body.address
//         }

//         const setting=new settingModal(data);
//         await setting.save()
//         .then((result)=>{
//               const output = {
//                     _status: true,
//                     _message: "Record inserted successfully",
//                     _data: result,
//                 }

//                 response.send(output);
//         }).catch((error)=>{
//                var errorMessage = [];
//                 for (err in error.errors) {
//                     errorMessage.push(error.errors[err].message);
//                 }
//                 const output = {
//                     _status: false,
//                     _message: "Record not inserted",
//                     _error: errorMessage,
//                     _data: null,
//                 }
//                 response.send(output);
//         })



//     }catch(error){
//         const output = {
//             _status: false,
//             _message: "Something went wrong",
//             _error: error.message,
//             _data: null,
//         }

//         response.send(output);
//     }
// }

exports.create = async (request, response) => {
    try {

        let logoUrl = "";

        if (request.file) {

           const result = await uploadToCloudinary(
    request.file,
    "hotelier/settings"
);

            logoUrl = result.secure_url;
        }

        const data = {
            logo: logoUrl,
            sitename: request.body.sitename,
            email: request.body.email,
            phone: request.body.phone,
            social_links: request.body.social_links,
            address: request.body.address
        };


        const setting = new settingModal(data);

        const result = await setting.save();

        response.send({
            _status: true,
            _message: "Record inserted successfully",
            _data: result,
        });

    } catch (error) {

        response.send({
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        });
    }
};

exports.view = async (request, response) => {
    try {
        await settingModal.findOne()
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
                    _setting_image_path:process.env.website_setting_image_path,
                    _data: result
                }
                response.send(output);

            })
            .catch(() => {
                const output = {
                    _status: false,
                    _message: 'No Record Found',
                    _data: null
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


// exports.update = async (request, response) => {
//     try {

//         const setting = await settingModal.findOne();

//         if (!setting) {
//             return response.send({
//                 _status: false,
//                 _message: "Settings not found",
//                 _data: null
//             });
//         }

//         // Update fields
//          setting.sitename=request.body.sitename,
//              setting.email=request.body.email,
//             setting.phone=request.body.phone,
//             setting.address=request.body.address,
//           setting.social_links = JSON.parse(request.body.social_links);
            
//         if (request.file) {
//             setting.logo = request.file.filename;
//         }

//         await setting.save();

//         response.send({
//             _status: true,
//             _message: "Record updated successfully",
//             _data: setting
//         });

//     } catch (error) {
//         response.send({
//             _status: false,
//             _message: "Something went wrong",
//             _error: error.message,
//             _data: null
//         });
//     }
// };


exports.update = async (request, response) => {
    try {

        const setting = await settingModal.findOne();

        if (!setting) {
            return response.send({
                _status: false,
                _message: "Settings not found",
                _data: null
            });
        }


        setting.sitename = request.body.sitename;
        setting.email = request.body.email;
        setting.phone = request.body.phone;
        setting.address = request.body.address;
        setting.social_links = JSON.parse(request.body.social_links);


      
    // Upload new logo to Cloudinary
if (request.file) {

    const result = await uploadToCloudinary(
        request.file,
        "hotelier/settings"
    );

    setting.logo = result.secure_url;
}


        await setting.save();

        response.send({
            _status: true,
            _message: "Record updated successfully",
            _data: setting
        });

    } catch (error) {

        response.send({
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null
        });
    }
};