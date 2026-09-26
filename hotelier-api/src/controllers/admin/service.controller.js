const serviceModal = require('../../models/Service');
require('dotenv').config();

exports.create = async (request, response) => {
    try {
        const data = {
            heading: request.body.heading,
            description: request.body.description,
           
        }

        const service = new serviceModal(data)
        await service.save()
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

    } catch (error) {
        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}


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


exports.update=async(request,response)=>{
   try{
        const data={
          heading: request.body.heading,
            description: request.body.description,
          
        }

      
        await serviceModal.updateOne({
            _id: request.params.id
        },{
            $set: data
        })
        
            .then((result) => {
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
            _data: null,
        }

        response.send(output);
    }

}

exports.details = async (request, response) => {
    try {
        await serviceModal.findById({
            _id: request.body.id
        })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
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
        await serviceModal.deleteOne({
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