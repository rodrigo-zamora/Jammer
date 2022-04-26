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

class ConflictError extends Error {
    constructor(message, options) {
        super(`409 conflict: ${message}`, options);
    }
}

class ForbiddenError extends Error {
    constructor(message, options) {
        super(`403 forbidden: ${message}`, options);
    }
}

class UnauthorizedError extends Error {
    constructor(message, options) {
        super(`401 unauthorized: ${message}`, options);
    }
}

module.exports = {
    NotFoundError,
    BadRequestError,
    ConflictError,
    ForbiddenError,
    UnauthorizedError
};