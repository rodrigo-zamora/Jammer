const express = require('express');
const cors = require('cors');

const Cuevana3 = require('./cuevana3');

app = express();

app.use(cors(
    {
        origin: '*'
    }
));

app.get('getMovies/:type', async (req, res) => {
    let data = await Cuevana3.getMovies(req.params.type);
    res.send(data);
});

app.get('getSeries/:type', async (req, res) => {
    let data = await Cuevana3.getSeries(req.params.type);
    res.send(data);
});

app.get('getDetail/:id', async (req, res) => {
    let data = await Cuevana3.getDetail(req.params.id);
    res.send(data);
});

app.get('getByGenre/:type/:page', async (req, res) => {
    let data = await Cuevana3.getByGenre(req.params.type, req.params.page);
    res.send(data);
});

app.get('getByActor/:id/:page', async (req, res) => {
    let data = await Cuevana3.getByActor(req.params.id, req.params.page);
    res.send(data);
});

app.get('getSearch/:query/:page', async (req, res) => {
    let data = await Cuevana3.getSearch(req.params.query, req.params.page);
    res.send(data);
});

app.get('getLinks/:id', async (req, res) => {
    let data = await Cuevana3.getLinks(req.params.id);
    res.send(data);
});

app.get('getDownload/:id', async (req, res) => {
    let data = await Cuevana3.getDownload(req.params.id);
    res.send(data);
});

app.get('getTrailer/:id', async (req, res) => {
    let data = await Cuevana3.getTrailer(req.params.id);
    res.send(data);
});

module.exports = app;