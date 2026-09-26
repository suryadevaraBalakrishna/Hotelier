const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register, login, ViewProfile, UpdateProfile, ChangePassword, forgotPassword, resetPassword,ViewAll } = require('../../controllers/admin/user.controller');
const path = require('path');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, 'uploads/user');
        },
        filename: function (request, file, callback) {
            callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    })

    const upload = multer({ storage: storage });

    router.post('/register', upload.single('image'), register);
    router.post('/login', upload.none(), login);
    router.post('/view-all', upload.none(), ViewAll);
    router.post('/view-profile', upload.none(), ViewProfile);
    router.post('/update-profile', upload.single('image'), UpdateProfile);
    router.post('/change-password', upload.none(), ChangePassword);
    router.post('/forgot-password', upload.none(), forgotPassword);
    router.post('/reset-password', upload.none(), resetPassword);



    server.use('/api/admin/user', router);
}




