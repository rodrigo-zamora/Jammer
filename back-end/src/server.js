const app = require('./app');
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME || '';
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_CLUSTER = process.env.DB_CLUSTER || '';

const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`;

mongoose.connect(DB_URI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + DB_URI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});