import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h2 className="font-semibold text-lg">
        {campaign.name}
      </h2>

      <div className="mt-2">
        <StatusBadge status={campaign.status} />
      </div>

      <div className="mt-3">
        <ProgressBar value={campaign.progress || 0} />
      </div>

      <Link
        to={`/campaign/${campaign._id}`}
        className="text-black-500 text-sm mt-3 block"
      >
        View Details →
      </Link>

    </div>
  );
};

export default CampaignCard;