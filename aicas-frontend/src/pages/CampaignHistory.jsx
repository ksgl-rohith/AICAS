import { useEffect, useState } from "react";
import { getCampaigns } from "../services/campaignService.js";
import Loader from "../components/Loader";

const CampaignHistory = () => {

  const [campaigns,setCampaigns] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchCampaigns = async()=>{

      try{

        const res = await getCampaigns();

        setCampaigns(res.data || []);

      }catch(err){

        console.error(err);

      }

      setLoading(false);

    };

    fetchCampaigns();

  },[]);

  if(loading) return <Loader/>;

  return(

    <div className="p-6 text-black">

      <h1 className="text-2xl font-bold mb-6">
        Campaign History
      </h1>

      <div className="bg-white rounded shadow">

        <table className="w-full text-left">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Campaign</th>
              <th className="p-3">Topic</th>
              <th className="p-3">Days</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {campaigns.length === 0 && (
              <tr>
                <td className="p-4" colSpan="5">
                  No campaigns found
                </td>
              </tr>
            )}

            {campaigns.map((c)=>(
              <tr
                key={c._id}
                className="border-t"
              >

                <td className="p-3">
                  {c.campaignName}
                </td>

                <td className="p-3">
                  {c.topic}
                </td>

                <td className="p-3">
                  {c.totalDays}
                </td>

                <td className="p-3">
                  {new Date(c.startDate).toLocaleDateString()}
                </td>

                <td className="p-3">

                  <span
                    className={
                      c.status === "ACTIVE"
                      ? "text-green-600"
                      : c.status === "PAUSED"
                      ? "text-yellow-600"
                      : "text-gray-600"
                    }
                  >
                    {c.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default CampaignHistory;