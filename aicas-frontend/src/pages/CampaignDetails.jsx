import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaignById } from "../services/campaignService";
import Loader from "../components/Loader";

const CampaignDetails = () => {

  const { id } = useParams();

  const [campaign,setCampaign] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchCampaign = async()=>{

      try{

        const data = await getCampaignById(id);

        console.log("Campaign:",data);

        setCampaign(data);

      }catch(err){

        console.error(err);

      }

      setLoading(false);

    }

    fetchCampaign();

  },[id])

  if(loading) return <Loader/>

  if(!campaign){
    return <div className="p-6">Campaign not found</div>
  }

  return(

    <div className="p-6 text-black" >

      <h1 className="text-2xl font-bold">
        {campaign.campaignName}
      </h1>

      <p className="mt-2">
        Topic: {campaign.topic}
      </p>

      <p className="mt-2">
        Total Days: {campaign.totalDays}
      </p>

      <p className="mt-2">
        Status: {campaign.status}
      </p>

      <p className="mt-2">
        Start Date: {new Date(campaign.startDate).toLocaleDateString()}
      </p>

    </div>

  )

}

export default CampaignDetails;