const express = require('express');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

require('dotenv').config();
require('./config/passport');

const cookieSession = require('cookie-session');
const passport = require('passport');

const COOKIE_KEY = process.env.COOKIE_KEY;

const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());

const userRoute = require('./routes/user.route');
const listRoute = require('./routes/list.route');
const movieRoute = require('./routes/movie.route');
/*const subscriptionRoute = require('./routes/subscription.route');*/
const authRoute = require('./routes/auth.route');
const {NotFoundError} = require('./utils/errors');

const swaggerDocument = YAML.load('src/docs/swagger.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoute);
app.use('/lists', listRoute);
app.use('/movies', movieRoute);
/*app.use('/subscription', subscriptionRoute);
app.use('/auth', authRoute);*/

app.use((error, req, res, next) => {
    console.log('Error', error);
    if (error.details) return res.status(400).send(error.details[0].message);
    if (error instanceof NotFoundError) return res.status(404).send(error.message);
    res.status(503).send('Internal server error');
});

module.exports = app;