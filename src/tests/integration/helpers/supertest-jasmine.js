module.exports = function endFunction(done) {
  return function (err) {
    if (err) {
      done.fail(err);
    } else {
      done();
    }
  }
};