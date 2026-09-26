const hotelModal = require('../../models/Hotel');
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



        const hotel = new hotelModal(data);
        await hotel.save()
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record inserted successfully",
                    _data: result,
                }

                response.send(output);

            }).catch((error) => {
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
        await hotelModal.find({ deletedAt: null })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
                    _hotel_setting_image_path: process.env.hotel_setting_image_path,
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

        const data = {
            name: request.body.name,
            slug: request.body.slug,
            description: request.body.description,
            location: request.body.location,
            order: request.body.order,
            status: request.body.status
        }

      
           if (request.files && request.files.image) {
            data.image = request.files.image[0].filename;
        }

        if (request.files && request.files.images) {
            data.images = request.files.images.map(file => file.filename);
        }



        await hotelModal.updateOne(
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
        await hotelModal.findById({
            _id: request.body.id
        }).then((result) => {
            const output = {
                _status: true,
                _message: "Record found successfully",
                _hotel_setting_image_path: process.env.hotel_setting_image_path,
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
        await hotelModal.deleteOne({
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





