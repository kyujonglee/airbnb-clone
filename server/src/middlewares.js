export const isAuthenticate = req => {
  if (req.user) {
    return;
  } else {
    throw Error('Authentication rights are required.');
  }
};
