export const defaults = {
  isLoggedIn: localStorage.getItem('token') !== null
};

export const resolvers = {
  Mutation: {
    logIn: (_, { token }, { cache }) => {
      localStorage.setItem('token', token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logOut: (_, __, { cache }) => {
      localStorage.removeItem('token');
      window.location = '/';
      return null;
    }
  }
};
