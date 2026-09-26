const newsletterModal = require('../../models/Newsletter');

exports.view = async (request, response) => {
    try {
      const newsletter=await  newsletterModal.find({deletedAt:null})
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record fetched successfully",
                    _data: result,
                }
                response.send(output);
            }).catch((error) => {
                const output = {
                    _status: false,
                    _message: "Record not fetched",
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