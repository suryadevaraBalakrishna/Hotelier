const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    create,
    view,
    update,
    details,
    destroy
} = require('../../controllers/admin/slider.controller');

module.exports = server => {

    const storage = multer.memoryStorage();

    const upload = multer({
        storage: storage
    });

    router.post('/create', upload.single('image'), create);
    router.post('/view', upload.none(), view);
    router.post('/update/:id', upload.single('image'), update);
    router.post('/details', upload.none(), details);
    router.post('/destroy', upload.none(), destroy);

    server.use('/api/admin/slider', router);
};