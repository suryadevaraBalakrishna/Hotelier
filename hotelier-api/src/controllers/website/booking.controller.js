const bookingModal = require("../../models/Booking");
const roomModal = require("../../models/Room");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


exports.create = async (request, response) => {
    try {

        const data = request.body;

        // Check room
        const room = await roomModal.findOne({
            _id: data.room_id,
            deletedAt: null,
            status: true
        });

        if (!room) {
            return response.send({
                _status: false,
                _message: "Room not found",
                _data: null
            });
        }

        // Calculate nights
        const checkIn = new Date(data.check_in);
        const checkOut = new Date(data.check_out);

        const difference = checkOut - checkIn;

        const totalNights = difference / (1000 * 60 * 60 * 24);

        if (totalNights <= 0) {
            return response.send({
                _status: false,
                _message: "Check-out date must be after check-in date",
                _data: null
            });
        }

        // Calculate total amount from database room price
        const totalAmount = totalNights * room.price;

        const booking = new bookingModal({
            user_id: data.user_id,
            hotel_id: room.hotel_id,
            room_id: room._id,

            check_in: checkIn,
            check_out: checkOut,

            guests: data.guests,

            guest_name: data.guest_name,
            email: data.email,
            mobile_number: data.mobile_number,

            room_price: room.price,
            total_nights: totalNights,
            total_amount: totalAmount,

            status: "pending"
        });

        const result = await booking.save();

        return response.send({
            _status: true,
            _message: "Booking created successfully",
            _data: result
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



exports.details = async (request, response) => {
    try {

        const booking = await bookingModal.findOne({
            _id: request.body.booking_id,
            deletedAt: null
        });

        if (!booking) {
            return response.send({
                _status: false,
                _message: "Booking not found",
                _data: null
            });
        }

        return response.send({
            _status: true,
            _message: "Booking details fetched successfully",
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


exports.createPayment = async (request, response) => {
    try {

        let token = request.headers.authorization;

        if (!token) {
            return response.send({
                _status: false,
                _message: "No Token Provided",
                _data: null
            });
        }

        token = token.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.KEY_VALUE
        );

        const booking = await bookingModal.findOne({
            _id: request.body.booking_id,
            user_id: decoded.userData._id,
            deletedAt: null
        });

        if (!booking) {
            return response.send({
                _status: false,
                _message: "Booking not found",
                _data: null
            });
        }

        if (booking.status !== "pending") {
            return response.send({
                _status: false,
                _message: "Booking is not pending",
                _data: null
            });
        }

        const orderInfo = await instance.orders.create({
            amount: booking.total_amount * 100,
            currency: "INR",
            receipt: booking._id.toString(),
            partial_payment: false
        });

        await bookingModal.updateOne(
            {
                _id: booking._id
            },
            {
                $set: {
                    order_id: orderInfo.id
                }
            }
        );

        return response.send({
            _status: true,
            _message: "Razorpay order created successfully",
            orderInfo: orderInfo,
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


exports.verifyPayment = async (request, response) => {
    try {

        const {
            booking_id,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = request.body;

        const booking = await bookingModal.findOne({
            _id: booking_id,
            deletedAt: null
        });

        if (!booking) {
            return response.send({
                _status: false,
                _message: "Booking not found",
                _data: null
            });
        }

        if (booking.order_id !== razorpay_order_id) {
            return response.send({
                _status: false,
                _message: "Invalid Razorpay order",
                _data: null
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return response.send({
                _status: false,
                _message: "Payment verification failed",
                _data: null
            });
        }

        await bookingModal.updateOne(
            { _id: booking._id },
            {
                $set: {
                    status: "confirmed"
                }
            }
        );

        return response.send({
            _status: true,
            _message: "Payment verified and booking confirmed",
            _data: {
                booking_id: booking._id,
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                status: "confirmed"
            }
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


exports.myBookings = async (request, response) => {
    try {

        let token = request.headers.authorization;

        if (!token) {
            return response.send({
                _status: false,
                _message: "No Token Provided",
                _data: null
            });
        }

        token = token.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.KEY_VALUE
        );

      const bookings = await bookingModal.find({
    user_id: decoded.userData._id,
    deletedAt: null
})
.populate("hotel_id", "name")
.populate("room_id", "name")
.sort({
    createdAt: -1
});

        return response.send({
            _status: true,
            _message: "Bookings fetched successfully",
            _data: bookings
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