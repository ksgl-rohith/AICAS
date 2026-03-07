const Campaign = require("../models/Campaign");

const getCampaignById = async (id) => {
  return await Campaign.findById(id);
};

module.exports = {
  getCampaignById
};