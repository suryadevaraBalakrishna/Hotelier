const menuModel = require('../../models/Menu');
require('dotenv').config();

exports.view = async (request, response) => {
    try {

        const id = request.body?.id;
        let result;
        let output;

        // 🔹 If ID exists → fetch single record
        if (id) {

            result = await menuModel.findOne({ _id: id })
                .populate('parentId', 'name');

            if (result) {
                output = {
                    _status: true,
                    _message: "Record found",
                    _data: result,
                };
            } else {
                output = {
                    _status: false,
                    _message: "Record not found",
                    _data: null,
                };
            }

            return response.send(output);
        }

        // 🔹 If no ID → fetch all records
        result = await menuModel.find({ deletedAt: null })
            .populate('parentId', 'name');;

        if (result && result.length > 0) {
            output = {
                _status: true,
                _message: "Record found",
                _data: result,
            };
        } else {
            output = {
                _status: false,
                _message: "No records found",
                _data: [],
            };
        }

        return response.send(output);

    } catch (error) {

        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        };

        response.send(output);
    }
}

