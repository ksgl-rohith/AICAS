import { useEffect, useState } from "react";
import {
  savePlatformToken,
  getPlatformTokens
} from "../services/platformService";

const PlatformSettings = () => {

  const [tokens,setTokens] = useState({});

  const [telegram,setTelegram] = useState({
    botToken:"",
    chatId:""
  });

  const [linkedin,setLinkedin] = useState("");
  const [discord,setDiscord] = useState("");
  const [facebook,setFacebook] = useState({
    pageToken:"",
    pageId:""
  });

  const [status,setStatus] = useState({});

  useEffect(()=>{

    loadStatus();

  },[]);

  const loadStatus = async()=>{

    try{

      const data = await getPlatformTokens();

      const connected = {};

      data.data.forEach(p=>{
        connected[p.platform] = true;
      });

      setStatus(connected);

    }catch(err){
      console.log(err);
    }

  };

  const connectTelegram = async()=>{

    if(!telegram.botToken || !telegram.chatId){
      alert("Telegram Bot Token and Chat ID required");
      return;
    }

    await savePlatformToken({
      platform:"telegram",
      accessToken:telegram.botToken,
      additionalData:{
        chatId:telegram.chatId
      }
    });

    alert("Telegram connected successfully");
    loadStatus();

  };

  const connectLinkedin = async()=>{

    if(!linkedin){
      alert("LinkedIn access token required");
      return;
    }

    await savePlatformToken({
      platform:"linkedin",
      accessToken:linkedin
    });

    alert("LinkedIn connected successfully");
    loadStatus();

  };

  const connectDiscord = async()=>{

    if(!discord){
      alert("Discord webhook required");
      return;
    }

    await savePlatformToken({
      platform:"discord",
      accessToken:discord
    });

    alert("Discord connected successfully");
    loadStatus();

  };

  const connectFacebook = async()=>{

    if(!facebook.pageToken || !facebook.pageId){
      alert("Facebook Page Token and Page ID required");
      return;
    }

    await savePlatformToken({
      platform:"facebook",
      accessToken:facebook.pageToken,
      additionalData:{
        pageId:facebook.pageId
      }
    });

    alert("Facebook connected successfully");
    loadStatus();

  };

  const Status = ({platform}) => {

    return status[platform]
      ? <span className="text-green-600">🟢 Connected</span>
      : <span className="text-red-500">🔴 Not Connected</span>;

  };

  return(

    <div className="p-6 text-black space-y-6">

      <h1 className="text-2xl font-bold">
        Platform Settings
      </h1>

{/* TELEGRAM */}

<div className="bg-white p-5 rounded text-black shadow">

<h2 className="font-semibold mb-3">
Telegram <Status platform="telegram"/>
</h2>

<input
placeholder="Bot Token"
className="border p-2 w-full mb-2 rounded"
onChange={(e)=>setTelegram({...telegram,botToken:e.target.value})}
/>

<input
placeholder="Chat ID"
className="border p-2 w-full mb-3 rounded"
onChange={(e)=>setTelegram({...telegram,chatId:e.target.value})}
/>

<button
onClick={connectTelegram}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Connect
</button>

</div>

{/* LINKEDIN */}

<div className="bg-white p-5 rounded shadow">

<h2 className="font-semibold mb-3">
LinkedIn <Status platform="linkedin"/>
</h2>

<input
placeholder="Access Token"
className="border p-2 w-full mb-3 rounded"
onChange={(e)=>setLinkedin(e.target.value)}
/>

<button
onClick={connectLinkedin}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Connect
</button>

</div>

{/* DISCORD */}

<div className="bg-white p-5 rounded shadow">

<h2 className="font-semibold mb-3">
Discord <Status platform="discord"/>
</h2>

<input
placeholder="Webhook URL"
className="border p-2 w-full mb-3 rounded"
onChange={(e)=>setDiscord(e.target.value)}
/>

<button
onClick={connectDiscord}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Connect
</button>

</div>

{/* FACEBOOK */}

<div className="bg-white p-5 rounded shadow">

<h2 className="font-semibold mb-3">
Facebook <Status platform="facebook"/>
</h2>

<input
placeholder="Page Access Token"
className="border p-2 w-full mb-2 rounded"
onChange={(e)=>setFacebook({...facebook,pageToken:e.target.value})}
/>

<input
placeholder="Page ID"
className="border p-2 w-full mb-3 rounded"
onChange={(e)=>setFacebook({...facebook,pageId:e.target.value})}
/>

<button
onClick={connectFacebook}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Connect
</button>

</div>

    </div>

  );

};

export default PlatformSettings;