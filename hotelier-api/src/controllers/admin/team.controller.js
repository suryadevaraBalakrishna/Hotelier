const teamModal = require('../../models/Team');
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
//         const data = {
//             name: request.body.name,
//             designation: request.body.designation,
//             image: request.file.filename,
//         }

//         const team = new teamModal(data)
//         await team.save()
//             .then((result) => {
//                 const output = {
//                     _status: true,
//                     _message: "Record inserted successfully",
//                     _data: result,
//                 }

//                 response.send(output);

//             }).catch((error) => {
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

//     } catch (error) {
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

        let imageUrl = "";

        if (request.file) {

           const result = await cloudinary.uploader.upload(
    request.file.path,
    {
        folder: "hotelier/team"
    }
);

            imageUrl = result.secure_url;
        }

        const data = {
            name: request.body.name,
            designation: request.body.designation,
            image: imageUrl
        };

        const team = new teamModal(data);

        const result = await team.save();

        response.send({
            _status: true,
            _message: "Record inserted successfully",
            _data: result
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



exports.view= async(request,response)=>{
    try{
         await teamModal.find({deletedAt: null})
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
                    _team_setting_image_path: process.env.team_setting_image_path,
                    _data: result,
                }   
                response.send(output);
            }
            )
            .catch((error) => {
                const output = {
                    _status: false,
                    _message: "Record not found",
                    _error: error.message,
                    _data: null,
                }
                response.send(output);
            })  
    }catch (error) {
        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}


// exports.update=async(request,response)=>{
//    try{
//         const data={
//         name: request.body.name,
//             designation: request.body.designation,
          
//         }

//         if(request.file){
//             data.image=request.file.filename;
//         }

//         await teamModal.updateOne({
//             _id: request.params.id
//         },{
//             $set: data
//         })
        
//             .then((result) => {
//                 const output = {
//                     _status: true,
//                     _message: 'Record Updated',
//                     _data: result
//                 }

//                 response.send(output);
//             })
//             .catch((error) => {
//                 const output = {
//                     _status: false,
//                     _message: 'Record not Updated',
//                     _error: error.message,
//                     _data: null
//                 }
//                 response.send(output);
//             })

//    }
//    catch (error) {
//         const output = {
//             _status: false,
//             _message: "Something went wrong",
//             _error: error.message,
//             _data: null,
//         }

//         response.send(output);
//     }

// }


exports.update = async (request, response) => {
    try {

        const data = {
            name: request.body.name,
            designation: request.body.designation
        };


        if (request.file) {

         const result = await uploadToCloudinary(
    request.file,
    "hotelier/team"
);

            data.image = result.secure_url;
        }


        const result = await teamModal.updateOne(
            {
                _id: request.params.id
            },
            {
                $set: data
            }
        );


        response.send({
            _status: true,
            _message: "Record Updated",
            _data: result
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

exports.details = async (request, response) => {
    try {
        await teamModal.findById({
            _id: request.body.id
        })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
                      _team_setting_image_path: process.env.team_setting_image_path,
                    _data: result
                }

                response.send(output);
            })
            .catch(() => {
                const output = {
                    _status: false,
                    _message: "No Record Found",
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
        await teamModal.deleteOne({
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
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}