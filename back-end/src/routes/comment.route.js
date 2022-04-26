const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const commentController = require('../controllers/comment.controller');

router.get('/:movieUUID', handleError(async (req, res) => {
    console.log('GET /comments/:movieUUID');
    let comments = await commentController.getAll(req.params.movieUUID);
    res.send(comments);
}));

router.post('/:movieUUID', handleError(async (req, res) => {
    console.log('POST /comments/:movieUUID');
    let comment = await commentController.create(req.params.movieUUID, req.body);
    res.send(comment);
}));

router.put('/:commentUUID/:userUUID', handleError(async (req, res) => {
    console.log('PUT /comments/:commentUUID/:userUUID');
    let comment = await commentController.update(req.params.commentUUID, req.params.userUUID, req.body);
    res.send(comment);
}));

router.delete('/:commentUUID/:userUUID', handleError(async (req, res) => {
    console.log('DELETE /comments/:commentUUID/:userUUID');
    let comment = await commentController.delete(req.params.commentUUID, req.params.userUUID);
    res.send(comment);
}));

module.exports = router;