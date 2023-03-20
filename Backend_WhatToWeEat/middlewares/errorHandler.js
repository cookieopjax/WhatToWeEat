exports.errorWrapper = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
};
