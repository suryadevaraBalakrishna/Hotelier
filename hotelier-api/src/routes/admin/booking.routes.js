const express = require('express');
const router = express.Router();

const {
   view,
} = require('../../controllers//admin/booking.controller');

module.exports = server => {  

    router.post('/view', view);

    server.use('/api/admin/booking', router);
}