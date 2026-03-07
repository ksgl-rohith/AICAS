import API from "./api";

export const login = async (data) => {

  const res = await API.post("/auth/login", data);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

export const register = async (data) => {

  const res = await API.post("/auth/register", data);

  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};