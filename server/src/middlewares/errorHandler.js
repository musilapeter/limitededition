const { sendError } = require('../utils/apiResponse');

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  return sendError(res, {
    statusCode,
    message: err.message || 'Internal server error',
    errors: err.errors || null,
  });
};

module.exports = { errorHandler };
