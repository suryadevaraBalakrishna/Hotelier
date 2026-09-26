const serviceModal = require('../../models/Service');
require('dotenv').config();



exports.view= async(request,response)=>{
    try{
         await serviceModal.find({deletedAt: null})
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
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

