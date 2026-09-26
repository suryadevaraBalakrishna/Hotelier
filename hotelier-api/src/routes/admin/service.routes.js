const express = require('express');
const router = express.Router();
const multer=require('multer');
const upload=multer();
const { create, view, update,details,destroy } = require('../../controllers/admin/service.controller');

module.exports = server => {

    router.post('/create', upload.none(), create);
    router.post('/view', upload.none(), view);
    router.post('/update/:id',upload.none(), update);
    router.post('/details', upload.none(), details);
    router.post('/destroy', upload.none(), destroy);

    server.use('/api/admin/service', router);
}




