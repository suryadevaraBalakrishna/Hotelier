const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    create,
    view,
    update,
    destroy,
    details
} = require('../../controllers/admin/room.controller');

module.exports = server => {

    const storage = multer.memoryStorage();

    const upload = multer({
        storage: storage
    });

    const singleMultiple = upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 6 }
    ]);

    router.post('/create', singleMultiple, create);
    router.post('/view', upload.none(), view);
    router.post('/update/:id', singleMultiple, update);
    router.post('/destroy', upload.none(), destroy);
    router.post('/details', upload.none(), details);

    server.use('/api/admin/room', router);
};