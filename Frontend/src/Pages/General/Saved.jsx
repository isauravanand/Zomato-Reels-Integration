import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount || 0, // Fallback for commentsCount
          foodPartner: item.food.foodpartner, // Correctly accessing foodpartner
        }));
        setSavedVideos(savedFoods);
      })
      .catch((error) => {
        console.error("Error fetching saved videos:", error);
      });
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white">
      {savedVideos.length > 0 ? (
        savedVideos.map((video) => (
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
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pb-20">
              {/* Description */}
              <p className="text-white text-center text-sm md:text-base mb-4 line-clamp-2">
                {video.description}
              </p>

              {/* Visit Store Button */}
              <Link
                to={`/food-partner/${video.foodPartner}`}
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
              >
                Visit Store
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-gray-400">No Saved Videos</h1>
          <p className="text-gray-500">You haven't saved any videos yet.</p>
        </div>
      )}
    </div>
  );
};

export default Saved;