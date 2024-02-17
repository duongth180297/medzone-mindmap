export const getUserName = () => {
  return localStorage.getItem('userName');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getSecretKey = () => {
  return localStorage.getItem('secretKey');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getIsRemember = () => {
  return localStorage.getItem('remember');
};
