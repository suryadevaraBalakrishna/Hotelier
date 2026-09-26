const roomModal = require("../../models/Room");
require('dotenv').config();

exports.create = async (request, response) => {
    try {
        const data = request.body;


        if (request.files && request.files.image) {
            data.image = request.files.image[0].filename;
        }

        if (request.files && request.files.images) {
            data.images = request.files.images.map(file => file.filename);
        }

        const room = new roomModal(data);
        await room.save()
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record inserted successfully",
                    _data: result,
                }

                response.send(output);

            }).catch((error) => {
                console.log(error);
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

exports.update = async (request, response) => {
    try {

         const data = request.body;


      
           if (request.files && request.files.image) {
            data.image = request.files.image[0].filename;
        }

        if (request.files && request.files.images) {
            data.images = request.files.images.map(file => file.filename);
        }



        await roomModal.updateOne(
            { _id: request.params.id }, {
            $set: data
        }
        ).then((result) => {
            const output = {
                _status: true,
                _message: 'Record Updated',
                _data: result
            }

            response.send(output);
        })
            .catch((error) => {
                const output = {
                    _status: false,
                    _message: 'Record not Updated',
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
            _data: null
        }
        response.send(output);
    }
}

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
