const express = require('express');
const router = express.Router();
const multer=require('multer');
const upload=multer();
const { view, } = require('../../controllers/website/service.controller');

module.exports = server => {

   
    router.post('/view', upload.none(), view);

    server.use('/api/website/service', router);
}




