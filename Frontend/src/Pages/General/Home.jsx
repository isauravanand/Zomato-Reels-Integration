import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((res) => {
        console.log("Response:", res.data);
        setVideos(Array.isArray(res.data.foodItems) ? res.data.foodItems : []);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setVideos([]); // fallback
      });
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {Array.isArray(videos) && videos.map((video) => (
        <div
          key={video._id}
          className="relative h-screen w-full snap-start flex justify-center items-center bg-black"
        >
          {/* Video */}
          <video
            src={video.video}
            className="h-full w-full object-cover"
            preload="metadata"
            autoPlay
            loop
            muted
          ></video>

          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-white text-center text-sm md:text-base mb-4 line-clamp-2">
              {video.description}
            </p>

            <Link
              to={`/food-partner/${video.foodpartner}`}
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
            >
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
