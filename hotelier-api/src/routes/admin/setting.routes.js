const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    create,
    view,
    update
} = require('../../controllers/admin/setting.controller');

module.exports = server => {

    const storage = multer.memoryStorage();

    const upload = multer({
        storage: storage
    });

    router.post('/create', upload.single('logo'), create);
    router.post('/view', upload.none(), view);
    router.post('/update', upload.single('logo'), update);

    server.use('/api/admin/setting', router);
};