const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    register,
    login,
    ViewProfile,
    UpdateProfile,
    ChangePassword,
    forgotPassword,
    resetPassword,
    ViewAll
} = require('../../controllers/admin/user.controller');

module.exports = server => {

    const storage = multer.memoryStorage();

    const upload = multer({
        storage: storage
    });

    router.post('/register', upload.single('image'), register);

    router.post('/login', upload.none(), login);

    router.post('/view-all', upload.none(), ViewAll);

    router.post('/view-profile', upload.none(), ViewProfile);

    router.post('/update-profile', upload.single('image'), UpdateProfile);

    router.post('/change-password', upload.none(), ChangePassword);

    router.post('/forgot-password', upload.none(), forgotPassword);

    router.post('/reset-password', upload.none(), resetPassword);

    server.use('/api/admin/user', router);
};