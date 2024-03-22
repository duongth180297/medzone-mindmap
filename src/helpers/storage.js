export const getUserName = () => {
  return localStorage.getItem("userName");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getSecretKey = () => {
  return localStorage.getItem("secretKey");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const getIsRemember = () => {
  return localStorage.getItem("remember");
};
export const setNode = (node) => {
  return localStorage.setItem("node", node);
};
export const getNode = () => {
  return localStorage.getItem("node");
};
export const setEdge = (edge) => {
  return localStorage.setItem("edge", edge);
};
export const getEdge = () => {
  return localStorage.getItem("edge");
};
