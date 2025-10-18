import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


const Profile = () => {
    const {id} = useParams();
    const [profile, setProfile] = useState(null)

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/food-partner/${id}`,{withCredentials:true})
        .then(res=>{
            // console.log("responced Data is:",res.data);
            setProfile(res.data.foodPartner);
        })
    },[id])

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <div className="bg-gray-800 rounded-lg p-6 mb-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-green-600 rounded-full mb-4"></div>
                <h2 className="text-lg font-bold mb-2">{profile?.name}</h2>
                <p className="text-sm text-gray-400 mb-4">{profile?.address}</p>
                <div className="flex justify-between w-full border-t border-gray-700 pt-4">
                    <div className="text-center">
                        <p className="text-lg font-bold">{profile?.totalMeals}</p>
                        <p className="text-sm text-gray-400">Total Meals</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold">{profile?.customerServed}</p>
                        <p className="text-sm text-gray-400">Customer Served</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg h-32 flex items-center justify-center">
                        <p className="text-sm text-gray-400">Video</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;