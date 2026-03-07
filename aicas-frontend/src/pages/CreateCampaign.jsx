import { useState } from "react";
import { createCampaign } from "../services/campaignService.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateCampaign = () => {

  const navigate = useNavigate();

  const [scheduleMode,setScheduleMode] = useState("auto");

  const [form,setForm] = useState({
    campaignName:"",
    topic:"",
    totalDays:"",
    frequency:["daily"],
    platforms:[],
    contentTypes:[],
    startDate:"",
    schedule:{}
  });

  const handleCheckbox = (field,value)=>{

    const current = form[field];

    if(current.includes(value)){
      setForm({
        ...form,
        [field]:current.filter(v=>v!==value)
      })
    }else{
      setForm({
        ...form,
        [field]:[...current,value]
      })
    }

  }

  const generateAutoSchedule = ()=>{

    return{
      monday:{hour:10,minute:0},
      tuesday:{hour:11,minute:0},
      wednesday:{hour:10,minute:0},
      thursday:{hour:9,minute:0},
      friday:{hour:11,minute:0},
      saturday:{hour:10,minute:0},
      sunday:{hour:12,minute:0}
    }

  }

  const handleManualSchedule=(day,time)=>{

    const [hour,minute] = time.split(":");

    setForm({
      ...form,
      schedule:{
        ...form.schedule,
        [day]:{
          hour:Number(hour),
          minute:Number(minute)
        }
      }
    })

  }

  const handleSubmit = async(e)=>{

    e.preventDefault();

    const payload={
      ...form,
      schedule:
        scheduleMode==="auto"
        ? generateAutoSchedule()
        : form.schedule
    }

    try{

      await createCampaign(payload);

      toast.success("Campaign created successfully ✅");

      setForm({
        campaignName:"",
        topic:"",
        totalDays:"",
        frequency:["daily"],
        platforms:[],
        contentTypes:[],
        startDate:"",
        schedule:{}
      });

      setTimeout(()=>{
        navigate("/")
      },1500)

    }catch(error){

      console.error(error);
      toast.error("Failed to create campaign ❌");

    }

  }

  return(

<div className="p-6 text-black max-w-xl">

<h1 className="text-2xl font-bold mb-6">
Create Campaign
</h1>

<form onSubmit={handleSubmit} className="space-y-4">

<input
value={form.campaignName}
placeholder="Campaign Name"
className="w-full border p-2 rounded"
onChange={(e)=>setForm({...form,campaignName:e.target.value})}
/>

<input
value={form.topic}
placeholder="Topic"
className="w-full border p-2 rounded"
onChange={(e)=>setForm({...form,topic:e.target.value})}
/>

<input
value={form.totalDays}
type="number"
placeholder="Total Days"
className="w-full border p-2 rounded"
onChange={(e)=>setForm({...form,totalDays:e.target.value})}
/>

<input
value={form.startDate}
type="date"
className="w-full border p-2 rounded"
onChange={(e)=>setForm({...form,startDate:e.target.value})}
/>

{/* Platforms */}

<div>

<p className="font-semibold mb-2">Platforms</p>

{["linkedin","telegram","facebook","discord"].map((p)=>(

<label key={p} className="mr-4">

<input
type="checkbox"
checked={form.platforms.includes(p)}
onChange={()=>handleCheckbox("platforms",p)}
/>

{" "}{p}

</label>

))}

</div>

{/* Content Types */}

<div>

<p className="font-semibold mb-2">Content Types</p>

{["text","image","video"].map((type)=>(

<label key={type} className="mr-4">

<input
type="checkbox"
checked={form.contentTypes.includes(type)}
onChange={()=>handleCheckbox("contentTypes",type)}
/>

{" "}{type}

</label>

))}

</div>

{/* Frequency */}

<select
value={form.frequency[0]}
className="border p-2 rounded"
onChange={(e)=>setForm({...form,frequency:[e.target.value]})}
>

<option value="daily">Daily</option>
<option value="weekly">Weekly</option>
<option value="monthly">Monthly</option>

</select>

{/* Schedule Mode */}

<div>

<p className="font-semibold mt-4 mb-2">
Scheduling Mode
</p>

<label className="mr-4">

<input
type="radio"
value="auto"
checked={scheduleMode==="auto"}
onChange={()=>setScheduleMode("auto")}
/>

 Automatic

</label>

<label>

<input
type="radio"
value="manual"
checked={scheduleMode==="manual"}
onChange={()=>setScheduleMode("manual")}
/>

 Manual

</label>

</div>

{/* Manual Scheduling */}

{scheduleMode==="manual" && (

<div className="mt-4">

<p className="font-semibold mb-3">
Manual Schedule
</p>

{[
"monday",
"tuesday",
"wednesday",
"thursday",
"friday",
"saturday",
"sunday"
].map(day=>(

<div key={day} className="flex items-center gap-3 mb-2">

<label className="w-24 capitalize">
{day}
</label>

<input
type="time"
className="border p-2 rounded"
onChange={(e)=>handleManualSchedule(day,e.target.value)}
/>

</div>

))}

</div>

)}

<button
type="submit"
className="bg-black text-white px-4 py-2 rounded"
>

Create Campaign

</button>

</form>

</div>

  )

}

export default CreateCampaign;