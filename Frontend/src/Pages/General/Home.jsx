import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaBookmark, FaComment } from "react-icons/fa";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [saved, setSaved] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((res) => {
        const items = Array.isArray(res.data.foodItems)
          ? res.data.foodItems
          : [];
        setVideos(items);

        const savedVideos = JSON.parse(localStorage.getItem("saved")) || [];
        setSaved(savedVideos);

        const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
        setLikes(storedLikes);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  
  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // 🚨 Change: Destructure the new like count from the response
      const { liked, newLikeCount } = res.data;

      // ✅ Update like state (Keep this as is)
      setLikes((prev) => {
        const updated = { ...prev, [id]: liked };
        localStorage.setItem("likes", JSON.stringify(updated));
        return updated;
      });

      // ✅ Update video like count: Use the count returned by the API
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === id
            ? {
              ...video,
              // 🚀 FIX: Directly set the count from the API response
              likes: newLikeCount,
            }
            : video
        )
      );
    } catch (err) {
      console.error("Error liking food:", err);
    }
  };


  const handleSave = (video) => {
    setSaved((prev) => {
      let updated;
      if (prev.find((v) => v._id === video._id)) {
        updated = prev.filter((v) => v._id !== video._id);
      } else {
        updated = [...prev, video];
      }
      localStorage.setItem("saved", JSON.stringify(updated));
      return updated;
    });
  };
  

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white">
      {videos.map((video) => {
        const isLiked = likes[video._id];
        const isSaved = saved.some((v) => v._id === video._id);

        return (
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

            {/* Transparent overlay for smooth text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Right-side floating icons with glassy background */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-4 backdrop-blur-md bg-black/20 rounded-2xl p-2">
              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => handleLike(video._id)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-lg transition-all"
                >
                  <FaHeart
                    className={`text-xl transition-all ${isLiked ? "text-red-500 scale-110" : "text-white"
                      }`}
                  />
                </button>
                <p className="text-xs opacity-80">
                  {isLiked ? (video.likes || 0) + 1 : video.likes || 0}
                </p>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => handleSave(video)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-lg transition-all"
                >
                  <FaBookmark
                    className={`text-xl transition-all ${isSaved ? "text-yellow-400" : "text-white"
                      }`}
                  />
                </button>
                <p className="text-xs opacity-80">
                  {isSaved ? (video.saves || 0) + 1 : video.saves || 0}
                </p>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="p-2 rounded-full bg-black/40 backdrop-blur-lg">
                  <FaComment className="text-xl text-white" />
                </div>
                <p className="text-xs opacity-80">{video.comments || 0}</p>
              </div>
            </div>

            {/* Description + Visit Button */}
            <div className="absolute bottom-20 left-4 right-4 flex flex-col gap-3">
              <p className="text-sm text-white/90">{video.description}</p>
              <Link
                to={`/food-partner/${video.foodpartner}`}
                className="self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all shadow-lg"
              >
                Visit store
              </Link>
            </div>
          </div>
        );
      })}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-black/60 backdrop-blur-md flex justify-around items-center py-3 border-t border-gray-700">
        <Link
          to="/"
          className="flex flex-col items-center text-white opacity-90 hover:opacity-100"
        >
          <FaHeart className="text-xl mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/saved"
          className="flex flex-col items-center text-white opacity-90 hover:opacity-100"
        >
          <FaBookmark className="text-xl mb-1" />
          <span className="text-xs">Saved</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
