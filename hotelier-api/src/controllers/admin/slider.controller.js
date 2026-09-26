const sliderModal = require("../../models/Slider");
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


// exports.create = async (request, response) => {
//     try {
//         const data = {
//             image: request.file.filename,
//             sub_heading: request.body.sub_heading,
//             heading: request.body.heading,
//             button_txt: request.body.button_txt,
//             button_link: request.body.button_link,
//             second_btn_txt: request.body.second_btn_txt,
//             second_btn_link: request.body.second_btn_link,
//         }

//         const slider = new sliderModal(data);
//         await slider.save()
//             .then((result) => {
//                 const output = {
//                     _status: true,
//                     _message: "Record inserted successfully",
//                     _data: result,
//                 }

//                 response.send(output);
//             })
//             .catch((error) => {
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

        let imageUrl = "";

        if (request.file) {

          const result = await uploadToCloudinary(
    request.file,
    "hotelier/sliders"
);

            imageUrl = result.secure_url;
        }


        const data = {
            image: imageUrl,
            sub_heading: request.body.sub_heading,
            heading: request.body.heading,
            button_txt: request.body.button_txt,
            button_link: request.body.button_link,
            second_btn_txt: request.body.second_btn_txt,
            second_btn_link: request.body.second_btn_link,
        };


        const slider = new sliderModal(data);

        const result = await slider.save();

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
        await sliderModal.find({deletedAt: null})
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
                      _slider_image_path: process.env.slider_image_path,
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


// exports.update=async(request,response)=>{
//    try{
//         const data={
//             sub_heading: request.body.sub_heading,
//             heading: request.body.heading,
//             button_txt: request.body.button_txt,
//             button_link: request.body.button_link,
//             second_btn_txt: request.body.second_btn_txt,
//             second_btn_link: request.body.second_btn_link,
//         }

//         if(request.file){
//             data.image=request.file.filename;
//         }

//         await sliderModal.updateOne({
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
            sub_heading: request.body.sub_heading,
            heading: request.body.heading,
            button_txt: request.body.button_txt,
            button_link: request.body.button_link,
            second_btn_txt: request.body.second_btn_txt,
            second_btn_link: request.body.second_btn_link,
        };


        if (request.file) {

           const result = await uploadToCloudinary(
    request.file,
    "hotelier/sliders"
);

            data.image = result.secure_url;
        }


        const result = await sliderModal.updateOne(
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
        await sliderModal.findById({
            _id: request.body.id
        })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
                    _slider_image_path: process.env.slider_image_path,
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
        await sliderModal.deleteOne({
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