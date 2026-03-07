import { useEffect, useState } from "react";
import { getCampaigns } from "../services/campaignService.js";
import CampaignCard from "../components/CampaignCard";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await getCampaigns();
        setCampaigns(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-black">
        Campaign Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 text-black">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
          />
        ))}
      </div>

    </div>
  );
};

export default Dashboard;