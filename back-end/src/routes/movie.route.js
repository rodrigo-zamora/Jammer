const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const movieController = require('../controllers/movie.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /movies');
    let movies = await movieController.getAllMovies();
    res.send(movies);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /movies');
    let movie = await movieController.create(req.body);
    res.send(movie);
}));

router.get('/search', handleError(async (req, res) => {
    console.log('GET /movies/search');
    let movie = await movieController.search(req.query);
    res.send(movie);
}));

router.get('/details/:cuevanaUUID/:cuevanaName', handleError(async (req, res) => {
    console.log('GET /movies/details/:cuevanaUUID');
    let cuevanaUUID = req.params.cuevanaUUID + '/' + req.params.cuevanaName
    let movieDetails = await movieController.getDetails(cuevanaUUID);
    res.send(movieDetails);
}));

router.get('/details/:cuevanaUUID/:cuevanaName/links', handleError(async (req, res) => {
    console.log('GET /movies/details/:cuevanaUUID/links');
    let cuevanaUUID = req.params.cuevanaUUID + '/' + req.params.cuevanaName
    let movieLinks = await movieController.getLinks(cuevanaUUID);
    res.send(movieLinks);
}));

router.get('/movie/:uuid', handleError(async (req, res) => {
    console.log('GET /movies/movie/:uuid');
    let movie = await movieController.get(req.params.uuid);
    res.send(movie);
}));

router.put('/movie/:uuid', handleError(async (req, res) => {
    console.log('PUT /movies/movie/:uuid');
    let movie = await movieController.update(req.params.uuid, req.body);
    res.send(movie);
}));

router.delete('/movie/:uuid', handleError(async (req, res) => {
    console.log('DELETE /movies/movie/:uuid');
    let movie = await movieController.delete(req.params.uuid);
    res.send(movie);
}));

module.exports = router;