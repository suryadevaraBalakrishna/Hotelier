const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },

    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: [true, "Hotel is required"]
    },

    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room is required"]
    },

    check_in: {
        type: Date,
        required: [true, "Check-in date is required"]
    },

    check_out: {
        type: Date,
        required: [true, "Check-out date is required"]
    },

    guests: {
        type: Number,
        required: [true, "Number of guests is required"]
    },

    guest_name: {
        type: String,
        required: [true, "Guest name is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"]
    },

    mobile_number: {
        type: String,
        required: [true, "Mobile number is required"]
    },

    order_id: {
    type: String,
    default: null
},
    room_price: {
        type: Number,
        required: [true, "Room price is required"]
    },

    total_nights: {
        type: Number,
        required: [true, "Total nights is required"]
    },

    total_amount: {
        type: Number,
        required: [true, "Total amount is required"]
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    deletedAt: {
        type: Date,
        default: null
    }

});

const bookingModal = mongoose.model('Booking', bookingSchema);

module.exports = bookingModal;