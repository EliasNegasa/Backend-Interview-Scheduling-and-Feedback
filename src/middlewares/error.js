const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Invalid ID';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message;
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'User already exist with this email.';
  }

  res.status(statusCode).json({
    message,
  });
};

export { notFound, errorHandler };
