import API from "./api";

export const savePlatformToken = async (data) => {
  const res = await API.post("/platforms/token", data);
  return res.data;
};

export const getPlatformTokens = async () => {
  const res = await API.get("/platforms/tokens");
  return res.data;
};