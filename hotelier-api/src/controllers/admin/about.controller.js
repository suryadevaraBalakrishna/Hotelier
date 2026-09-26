const aboutModal = require('../../models/About');
require('dotenv').config();

exports.create = async (request, response) => {
    try {
        const data = {
            image: request.file.filename,
            sub_heading: request.body.sub_heading,
            heading: request.body.heading,
            description: request.body.description,
            button_txt: request.body.button_txt,
            button_link: request.body.button_link
        }

        const about = new aboutModal(data);
        await about.save()
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record inserted successfully",
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


exports.view = async (request, response) => {
    try {
        await aboutModal.findOne()
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
                    _about_setting_image_path: process.env.about_setting_image_path,
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


exports.update = async (request, response) => {
    try {

        const setting = await aboutModal.findOne();

        if (!setting) {
            return response.send({
                _status: false,
                _message: "Settings not found",
                _data: null
            });
        }

        // Update fields

        setting.sub_heading = request.body.sub_heading,
            setting.heading = request.body.heading,
            setting.description = request.body.description,
            setting.button_txt = request.body.button_txt,
            setting.button_link = request.body.button_link

        if (request.file) {
            setting.image = request.file.filename;
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