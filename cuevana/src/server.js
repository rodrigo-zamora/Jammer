const app = require('./app');
const port = 8000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});