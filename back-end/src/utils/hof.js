function handleError(fn) {
  return async function(req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log('Something went wrong', err);
      next(err);
    }
  }
}

module.exports = {handleError};