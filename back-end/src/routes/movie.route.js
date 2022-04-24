const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const movieController = require('../controllers/movie.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /movies');
    movieController.getAllMovies(res);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /movies');
    movieController.create(req.body, res);
}));

router.get('/search', handleError(async (req, res) => {
    console.log('GET /movies/search');
    movieController.search(req.query, res);
}));

router.get('/details', handleError(async (req, res) => {
    console.log('GET /movies/details');
    movieController.getDetails(req.query.cuevanaUUID, res);
}));

router.get('/movie/:uuid', handleError(async (req, res) => {
    console.log('GET /movies/movie/:uuid');
    movieController.get(req.params.uuid, res);
}));

router.put('/movie/:uuid', handleError(async (req, res) => {
    console.log('PUT /movies/movie/:uuid');
    movieController.update(req.params.uuid, req.body, res);
}));

router.delete('/movie/:uuid', handleError(async (req, res) => {
    console.log('DELETE /movies/movie/:uuid');
    movieController.delete(req.params.uuid, res);
}));

module.exports = router;