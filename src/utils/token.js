export const setToken = function (key, value) {
  sessionStorage.setItem(`${key}`, value);
};
export const getToken = function (key) {
  const token = sessionStorage.getItem(key);
  if (token) {
    return token;
  }
};
export const removeToken = function (key) {
  sessionStorage.removeItem(key);
};
const token = {
  setToken,
  getToken,
  removeToken,
};
export default token;
