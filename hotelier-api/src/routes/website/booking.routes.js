const express = require('express');
const router = express.Router();

const {
    create,
    details,
    createPayment,
    verifyPayment,
    myBookings
} = require('../../controllers/website/booking.controller');

module.exports = server => {

    router.post('/create', create);

    router.post('/details', details);

    router.post('/payment', createPayment);

    router.post('/verify-payment', verifyPayment);

    router.post('/my-bookings', myBookings);

    server.use('/api/website/booking', router);
}