const express = require('express');
const path = require('path');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

require('dotenv').config();
require('./config/passport');

const http = require('http');
const { Server } = require('socket.io'); 

const cookieSession = require('cookie-session');
const passport = require('passport');

const COOKIE_KEY = process.env.COOKIE_KEY || 'secret';

const app = express();

const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME || '';
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_CLUSTER = process.env.DB_CLUSTER || '';

const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`;

mongoose.connect(DB_URI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('addComment', (data) => {
        if (!data.isPrivate) {
            console.log('New comment added: ', data);
            io.emit('newComment', data);
        }
    });

});

app.use(cors());

const userRoute = require('./routes/user.route');
const listRoute = require('./routes/list.route');
const movieRoute = require('./routes/movie.route');
const tagRoute = require('./routes/tags.route');
const commentRoute = require('./routes/comment.route');
const subscriptionRoute = require('./routes/subscription.route');
const authRoute = require('./routes/auth.route');

const swaggerDocument = YAML.load(path.resolve('./src/docs/swagger.yaml'));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Jammer Service API');
});

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/lists', listRoute);
app.use('/movies', movieRoute);
app.use('/subscription', subscriptionRoute);
app.use('/tags', tagRoute);
app.use('/comments', commentRoute);

const {
    NotFoundError,
    ConflictError,
    BadRequestError,
    ForbiddenError,
    UnauthorizedError
} = require('./utils/errors');

app.use((err, req, res, next) => {
    if (err.details) return res.status(400).send(err.details[0].message);

    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    if (err instanceof ConflictError) return res.status(409).send(err.message);
    if (err instanceof BadRequestError) return res.status(400).send(err.message);
    if (err instanceof ForbiddenError) return res.status(403).send(err.message);
    if (err instanceof UnauthorizedError) return res.status(401).send(err.message);

    res.status(503).send('Something went wrong, try again');
});

app.get('*', (req, res) => {
    res.send('404 Not found');
});

module.exports = app;