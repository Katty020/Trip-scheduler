import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { chatSession } from "@/service/AIModel";

import React, {useEffect, useState} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from "sonner";

function CreateTrip() {
    const [place,setPlace]= useState();
    const [formData, setFormData]=useState([]);

    const handInputChange=(name,value)=>{
        
       
        setFormData({
            ...formData,
            [name]:value
        }) 
    }
    useEffect(()=>{
        console.log(formData);
    },{formData})

    const OnGenerateTrip=async()=>{
        if(formData?.noOfDays>5&& !formData?.location || !formData?.budget || !formData?.traveler){
            toast("! PLEASE FILL ALL THE DETAILS")

            return;
        }
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays)
        console.log(FINAL_PROMPT);
        const result=await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
    }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10'>
        <h2 className='font-bold text-3xl'>
        Tell us your travel preferences 🏝 🏜

        </h2>
        <p  className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        <div className='mt-20 flex flex-col gap-25'>
            <div>
                <h2 className='text-xl my-3 font-medium'>
                What is destination of your choice? 🗺
                </h2>
                <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                        place,
                        onChange:(v)=>{setPlace(v); handInputChange('location',v)}
                    }}
                
                />
                <div>
                <h2 className='text-xl my-3 font-medium'>
                How many days are you planning your trip? ⌚️</h2>
                <Input placeholder={'Ex.3'} type="number"
                onChange={(e)=>handInputChange('noOfDays', e.target.value)}
                />
                
                </div>
            </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'> What is your Budget? 🫶🏿
                    </h2>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {SelectBudgetOptions.map((item,index)=>(
                        <div key={index} 
                        onClick={()=>handInputChange('budget', item.title)}
                        className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.budget==item.title&&'shadow-lg border-black'}
                        `}>
                            <h2 className="text-4xl">
                                {item.icons}
                            </h2>
                            <h2 className="font-bold text-lg">
                                {item.title}
                            </h2>
                            <h2 className="text-sm text-gray-600">
                                {item.desc}
                            </h2>
                      </div>
                    ))}
                </div>
                
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'> Who do you plan on traveling with on your next adventure?</h2>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {SelectTravelesList.map((item,index)=>(
                        <div key={index}
                        onClick={()=>handInputChange('traveler', item.people)}
                        className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.traveler==item.people&&'shadow-lg border-black'}
                        `}>
                            <h2 className="text-4xl">
                                {item.icons}
                            </h2>
                            <h2 className="font-bold text-lg">
                                {item.title}
                            </h2>
                            <h2 className="text-sm text-gray-600">
                                {item.desc}
                            </h2>
                      </div>
                    ))}
                </div>
                </div>
                </div>
                    <div className="my-10 justify-end flex">
                        <Button onClick={OnGenerateTrip}>
                            Generate Trip
                        </Button>
                    </div>

    </div>
  )
}

export default CreateTrip