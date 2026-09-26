const bookingModal = require("../../models/Booking");
const roomModal = require("../../models/Room");
const userModal = require('../../models/User');

exports.view = async (request, response) => {
    try {

        const booking = await bookingModal
            .find({ deletedAt: null })
            .populate("room_id")
            .sort({ createdAt: -1 });

        return response.send({
            _status: true,
            _message: "Booking List",
            _data: booking
        });

    } catch (error) {

        console.log(error);

        return response.send({
            _status: false,
            _message: "Something went wrong",
            _data: null
        });
    }
};