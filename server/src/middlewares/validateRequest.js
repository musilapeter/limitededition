const { AppError } = require('../utils/appError');

const validateRequest = (schema, source = 'body') => (req, res, next) => {
  const parsed = schema.safeParse(req[source]);

  if (!parsed.success) {
    return next(
      new AppError('Validation failed', 422, parsed.error.issues.map((item) => item.message)),
    );
  }

  req[source] = parsed.data;
  return next();
};

module.exports = { validateRequest };
