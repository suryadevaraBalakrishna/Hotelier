const express=require('express');
const server=express();
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());




server.get('/',(request,response)=>{
    response.send('server is running!');
})


//importing routes
require('./src/routes/admin/setting.routes')(server);
require('./src/routes/admin/menu.routes')(server);
require('./src/routes/admin/newsletter.routes')(server);
require('./src/routes/admin/slider.routes')(server);
require('./src/routes/admin/about.routes')(server);
require('./src/routes/admin/team.routes')(server);
require('./src/routes/admin/service.routes')(server);
require('./src/routes/admin/user.routes')(server);
require('./src/routes/admin/hotel.routes')(server);
require('./src/routes/admin/room.routes')(server);
require('./src/routes/admin/booking.routes')(server);


//website routes
require('./src/routes/website/setting.routes')(server);
require('./src/routes/website/menu.routes')(server);
require('./src/routes/website/newsletter.routes')(server);
require('./src/routes/website/slider.routes')(server);
require('./src/routes/website/about.routes')(server);
require('./src/routes/website/team.routes')(server);
require('./src/routes/website/service.routes')(server);
require('./src/routes/website/user.routes')(server);
require('./src/routes/website/hotel.routes')(server);
require('./src/routes/website/booking.routes')(server);



//image folder
server.use('/uploads/setting',express.static('uploads/setting'));
server.use('/uploads/slider',express.static('uploads/slider'));
server.use('/uploads/about',express.static('uploads/about'));
server.use('/uploads/team',express.static('uploads/team'));
server.use('/uploads/user',express.static('uploads/user'));
server.use('/uploads/hotel',express.static('uploads/hotel'));
server.use('/uploads/room',express.static('uploads/room'));

// server.listen(process.env.PORT,()=>{
//     mongoose.connect(process.env.DB)
//     .then(()=>{
//         console.log('Database connected');
//     }).catch((error)=>{
//         console.log(error);
//     })
// })


// server.listen(process.env.PORT, () => {

//     mongoose.connect(process.env.DB)
//         .then(() => {
//             console.log('Database connected');
//         })
//         .catch((error) => {
//             console.log(error);
//         });

// });

// mongoose.connect(process.env.DB)
//     .then(() => {
//         console.log('Database connected');
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// if (process.env.NODE_ENV !== 'production') {
//     server.listen(process.env.PORT, () => {
//         console.log(`Server running on port ${process.env.PORT}`);
//     });
// }

// module.exports = server;


const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    await mongoose.connect(process.env.DB);
    console.log('Database connected');
};

if (process.env.NODE_ENV !== 'production') {
    connectDB()
        .then(() => {
            server.listen(process.env.PORT, () => {
                console.log(`Server running on port ${process.env.PORT}`);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

const handler = async (request, response) => {
    try {
        await connectDB();
        server(request, response);
    } catch (error) {
        console.log('Database connection error:', error);

        response.status(500).json({
            _status: false,
            _message: 'Database connection failed',
            _data: null
        });
    }
};

module.exports = handler;