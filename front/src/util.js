export const parseCookies = cookies => {
  return cookies.split(';').reduce((acc, cookie) => {
    cookie = cookie.trim();
    const arr = cookie.split('=');
    const key = arr[0];
    const value = arr[1];
    acc[key] = value;
    return acc;
  }, {});
};
