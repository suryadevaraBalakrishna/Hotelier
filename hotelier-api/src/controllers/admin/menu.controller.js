const menuModel = require('../../models/Menu');
require('dotenv').config();

exports.create=async(request,response)=>{
    try{
        const data={
            name:request.body.name,
            link:request.body.link,
            slug:request.body.slug,
            parentId:request.body.parentId ? request.body.parentId : null,
            order:request.body.order,   
            status:request.body.status,
        }

         await new menuModel(data).save()
        .then((result)=>{
            const output = {
                _status: true,
                _message: "Record inserted successfully",
                _data: result,
            }
            response.send(output);
        }).catch((error)=>{
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

    }catch(error){
        const output = {
            _status: false,
            _message: "Something went wrong!",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}


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


exports.update=async(request,response)=>{
    try{
         const data={
        name:request.body.name,
        slug:request.body.slug,
        link:request.body.link,
        parentId:request.body.parentId ? request.body.parentId : null,
        order:request.body.order,
        status:request.body.status,
    }

        await menuModel.updateOne({
            _id:request.params.id,
        },{
            $set:data,
        })
        .then((result)=>{
              const output = {
                    _status: true,
                    _message: 'Record Updated',
                    _data: result
                }

                response.send(output);
        })
        .catch((error)=>{
                const output = {
                    _status: false,
                    _message: 'Record not Updated',
                    _error: error.message,      
                    _data: null
                }   
                response.send(output);
        })
    }
    catch(error){
        const output={
            _status:false,
            _message:"Something went wrong",
            _error:error.message,           
            _data:null,
        }
        response.send(output);
    }
}






exports.destroy=async(request,response)=>{
    try{
        await menuModel.deleteOne({
            _id:request.body.id,
        },{
            $set:{
                deletedAt:Date.now(),
            }
        })
        .then((result)=>{
            const output = {
                _status: true,
                _message: 'Record Deleted',
                _data: result
            }
            response.send(output);
        })
        .catch((error)=>{
            const output={
                _status: false,
                _message: 'Record not Deleted',
                _error: error.message,      
                _data: null
            }
                response.send(output);
        })
    }
    catch(error){
        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,  
                _data: null,
        }
        response.send(output);
    }   
}