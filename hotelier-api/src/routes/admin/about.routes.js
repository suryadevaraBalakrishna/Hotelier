const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    create,
    view,
    update
} = require('../../controllers/admin/about.controller');

module.exports = server => {

    const storage = multer.memoryStorage();

    const upload = multer({
        storage: storage
    });

    router.post('/create', upload.single('image'), create);
    router.post('/view', upload.none(), view);
    router.post('/update', upload.single('image'), update);

    server.use('/api/admin/about', router);
};