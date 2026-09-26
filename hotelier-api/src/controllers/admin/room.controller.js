const roomModal = require("../../models/Room");
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

// exports.create = async (request, response) => {
//     try {
//         const data = request.body;


//         if (request.files && request.files.image) {
//             data.image = request.files.image[0].filename;
//         }

//         if (request.files && request.files.images) {
//             data.images = request.files.images.map(file => file.filename);
//         }

//         const room = new roomModal(data);
//         await room.save()
//             .then((result) => {
//                 const output = {
//                     _status: true,
//                     _message: "Record inserted successfully",
//                     _data: result,
//                 }

//                 response.send(output);

//             }).catch((error) => {
//                 console.log(error);
//                 var errorMessage = [];
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
//             })



//     }
//     catch (error) {
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

        const data = request.body;

    // Upload main room image
if (request.files && request.files.image) {

    const result = await uploadToCloudinary(
        request.files.image[0],
        "hotelier/rooms"
    );

    data.image = result.secure_url;
}


// Upload multiple room images
if (request.files && request.files.images) {

    const imageUrls = [];

    for (const file of request.files.images) {

        const result = await uploadToCloudinary(
            file,
            "hotelier/rooms"
        );

        imageUrls.push(result.secure_url);
    }

    data.images = imageUrls;
}


        const room = new roomModal(data);

        const result = await room.save();


        const output = {
            _status: true,
            _message: "Record inserted successfully",
            _data: result,
        };

        response.send(output);


    } catch (error) {

        console.log(error);

        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        };

        response.send(output);
    }
};



exports.view = async (request, response) => {
    try {
        await roomModal.find({ deletedAt: null })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
                    _room_setting_image_path: process.env.room_setting_image_path,
                    _data: result
                }
                response.send(output);
            }).catch(() => {
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

//          const data = request.body;


      
//            if (request.files && request.files.image) {
//             data.image = request.files.image[0].filename;
//         }

//         if (request.files && request.files.images) {
//             data.images = request.files.images.map(file => file.filename);
//         }



//         await roomModal.updateOne(
//             { _id: request.params.id }, {
//             $set: data
//         }
//         ).then((result) => {
//             const output = {
//                 _status: true,
//                 _message: 'Record Updated',
//                 _data: result
//             }

//             response.send(output);
//         })
//             .catch((error) => {
//                 const output = {
//                     _status: false,
//                     _message: 'Record not Updated',
//                     _error: error.message,
//                     _data: null
//                 }
//                 response.send(output);
//             })



//     }
//     catch (error) {
//         const output = {
//             _status: false,
//             _message: "Something went wrong",
//             _error: error.message,
//             _data: null
//         }
//         response.send(output);
//     }
// }


exports.update = async (request, response) => {
    try {

        const data = request.body;


        // Update main room image
if (request.files && request.files.image) {

    const result = await uploadToCloudinary(
        request.files.image[0],
        "hotelier/rooms"
    );

    data.image = result.secure_url;
}


// Update gallery images
if (request.files && request.files.images) {

    const imageUrls = [];

    for (const file of request.files.images) {

        const result = await uploadToCloudinary(
            file,
            "hotelier/rooms"
        );

        imageUrls.push(result.secure_url);
    }

    data.images = imageUrls;
}


        const output = {
            _status: true,
            _message: "Record Updated",
            _data: result
        };

        response.send(output);


    } catch (error) {

        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null
        };

        response.send(output);
    }
};



exports.details = async (request, response) => {
    try {
        await roomModal.findById({
            _id: request.body.id
        }).then((result) => {
            const output = {
                _status: true,
                _message: "Record found successfully",
                _room_setting_image_path: process.env.room_setting_image_path,
                _data: result
            }
            response.send(output);
        }).catch(() => {
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
            _message: "something went wrong",
            _error: error.message,
            _data: null
        }

        response.send(output);
    }
}

exports.destroy = async (request, response) => {
    try {
        await roomModal.deleteOne({
            _id: request.body.id
        }, {
            $set: {
                deletedAt: Date.now(),
            }
        })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: 'Record Deleted',
                    _data: result
                }
                response.send(output);
            })
            .catch((error) => {
                const output = {
                    _status: false,
                    _message: 'Record not Deleted',
                    _error: error.message,
                    _data: null
                }
                response.send(output);
            })

    }
    catch (error) {
        const output = {
            _status: false,
            _message: "something went wrong",
            _error: error.message,
            _data: null
        }

        response.send(output);
    }
}
