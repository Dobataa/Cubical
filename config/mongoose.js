const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://dobata:softuniMongo@cluster0.zhm0dg0.mongodb.net/');

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.error.bind(console, 'Db connected!'));
};