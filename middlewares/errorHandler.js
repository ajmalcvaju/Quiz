const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "An unexpected error occurred";
  res.status(statusCode).json({ message });
  if (process.env.NODE_ENV === "development") {
    res.json({ stack: err.stack });
  }
};

module.exports = errorHandler;
