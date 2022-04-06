const {NotFoundError} = require('./errors');

function handleError(fn) {
  return async function(req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log('Internal server error', err);
      next(err);
    }
  }
}

module.exports = {handleError};