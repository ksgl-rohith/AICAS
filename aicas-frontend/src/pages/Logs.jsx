import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";

const Logs = () => {

  const [logs,setLogs] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchLogs = async()=>{

      try{

        const res = await API.get("/logs");

        setLogs(res.data || []);

      }catch(err){
        console.error(err);
      }

      setLoading(false);

    };

    fetchLogs();

  },[]);

  if(loading) return <Loader/>

  return(

    <div className="p-6 text-black">

      <h1 className="text-2xl font-bold mb-6">
        Automation Logs
      </h1>

      <div className="bg-white shadow rounded">

        <table className="w-full text-left">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Campaign</th>
              <th className="p-3">Action</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Time</th>
            </tr>

          </thead>

          <tbody>

            {logs.length === 0 && (

              <tr>
                <td colSpan="4" className="p-4">
                  No logs available
                </td>
              </tr>

            )}

            {logs.map((log)=>(
              
              <tr key={log._id} className="border-t">

                <td className="p-3">
                  {log.campaignName}
                </td>

                <td className="p-3">
                  {log.action}
                </td>

                <td className="p-3">
                  {log.platform}
                </td>

                <td className="p-3">
                  {new Date(log.createdAt).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Logs