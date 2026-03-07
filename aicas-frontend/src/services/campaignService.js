import API from "./api";

export const getCampaigns = async () => {
  const res = await API.get("/campaigns");
  return res.data;
};

export const getCampaignById = async (id) => {
  const res = await API.get(`/campaigns/${id}`);
  return res.data;
};

export const createCampaign = async (data) => {
  const res = await API.post("/campaigns/create", data);
  return res.data;
};

export const pauseCampaign = async (id) => {
  const res = await API.put(`/campaigns/${id}/pause`);
  return res.data;
};

export const resumeCampaign = async (id) => {
  const res = await API.put(`/campaigns/${id}/resume`);
  return res.data;
};

export const completeCampaign = async (id) => {
  const res = await API.put(`/campaigns/${id}/complete`);
  return res.data;
};