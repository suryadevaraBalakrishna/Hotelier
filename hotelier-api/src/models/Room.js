const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    images: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: [true, "Hotel is required"]
    },
    price: {
        type: Number,
        required: true
    },

    totalRooms: {
        type: Number,
        required: true
    },

    maxGuests: {
        type: Number,
        default: 2
    },
    order: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    }

})


const roomModal = mongoose.model('Room', roomSchema);
module.exports = roomModal;