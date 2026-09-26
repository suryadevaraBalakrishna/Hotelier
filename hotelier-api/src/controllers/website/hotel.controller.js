const hotelModal = require('../../models/Hotel');
const roomModal = require("../../models/Room");
require('dotenv').config();

exports.view = async (request, response) => {
    try {
      let filter = {
            deletedAt: null
        };

        if (request.body && request.body.location) {
            filter.location = request.body.location;
        }

        const hotels = await hotelModal.find(filter);



       
         response.send({
            _status: true,
            _message: "Record found successfully",
            _hotel_setting_image_path: process.env.hotel_setting_image_path,
            _data: hotels
        });
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
    const hotel = await hotelModal.findOne({
    deletedAt: null,
    $or: [
        { slug: request.body.slug },
        { _id: request.body.hotel_id }
    ]
});
      if(!hotel){
         const output = {
                _status: false,
                _message: 'No Record Found',
                _data: null
            }

        return response.send(output);
      }

      const rooms=await roomModal.find({
           hotel_id: hotel._id,
            deletedAt: null
      })
        response.send({
            _status: true,
            _message: "Record found successfully",
            _hotel_setting_image_path: process.env.hotel_setting_image_path,
            _room_setting_image_path: process.env.room_setting_image_path,
            _data: {
                hotel,
                rooms
            }
        });
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



