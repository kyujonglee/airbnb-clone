const isAuthenticate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    throw Error('Authentication rights are required.');
  }
};
