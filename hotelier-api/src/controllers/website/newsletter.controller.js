const newsletterModal = require('../../models/Newsletter');

exports.create = async (request, response) => {
    try {
        const data = {
            email: request.body.email,
        }

        const newsletter = new newsletterModal(data);
        await newsletter.save()
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