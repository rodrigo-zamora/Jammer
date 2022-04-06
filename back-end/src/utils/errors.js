class NotFoundError extends Error {
    constructor(message, options) {
        super(`404 not found: ${message}`, options);
    }
}

class BadRequestError extends Error {
    constructor(message, options) {
        super(`400 bad request: ${message}`, options);
    }
}

module.exports = {
    NotFoundError,
    BadRequestError
};