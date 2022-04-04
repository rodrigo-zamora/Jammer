const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const movieController = require('../controllers/movie.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /movies');
    const movies = await movieController.getAllMovies();
    res.send(movies);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /movies');
    movieController.create(req.body, res);
}));

router.get('/:uuid', handleError(async (req, res) => {
    console.log('GET /movies/:uuid');
    movieController.get(req.params.uuid, res);
}));

router.put('/:uuid', handleError(async (req, res) => {
    console.log('PUT /movies/:uuid');
    movieController.update(req.params.uuid, req.body, res);
}));

router.delete('/:uuid', handleError(async (req, res) => {
    console.log('DELETE /movies/:uuid');
    movieController.delete(req.params.uuid, res);
}));

module.exports = router;