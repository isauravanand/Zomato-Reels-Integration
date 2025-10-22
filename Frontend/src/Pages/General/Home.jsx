import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaBookmark, FaComment } from "react-icons/fa";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [saved, setSaved] = useState([]);
  const [likes, setLikes] = useState({});

  // 🔹 Fetch all videos on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((res) => {
        const items = Array.isArray(res.data.foodItems)
          ? res.data.foodItems
          : [];
        setVideos(items);

        // Load saved + liked states from localStorage
        const savedVideos = JSON.parse(localStorage.getItem("saved")) || [];
        setSaved(savedVideos);

        const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
        setLikes(storedLikes);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  // ❤️ Handle Like / Unlike
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

      const { liked, newLikeCount } = res.data;

      // Update like state locally
      setLikes((prev) => {
        const updated = { ...prev, [id]: liked };
        localStorage.setItem("likes", JSON.stringify(updated));
        return updated;
      });

      // Update the video like count in UI
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === id ? { ...video, likeCount: newLikeCount } : video
        )
      );
    } catch (err) {
      console.error("Error liking food:", err);
    }
  };

  // 🔖 Handle Save / Unsave
  const handleSave = async (video) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: video._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const message = res.data.message;
      const newSaveCount = res.data.newSaveCount; // ✅ optional if backend sends this

      // Update saved videos locally
      setSaved((prev) => {
        let updated;
        if (message.includes("unsaved")) {
          updated = prev.filter((v) => v._id !== video._id);
        } else {
          updated = [...prev, video];
        }
        localStorage.setItem("saved", JSON.stringify(updated));
        return updated;
      });

      // Update saves count in UI
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v._id === video._id
            ? {
              ...v,
              savesCount:
                newSaveCount !== undefined
                  ? newSaveCount
                  : message.includes("unsaved")
                    ? Math.max((v.savesCount || 1) - 1, 0)
                    : (v.savesCount || 0) + 1,
            }
            : v
        )
      );
    } catch (err) {
      console.error("Error saving food:", err);
    }
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
            {/* 🎥 Video */}
            <video
              src={video.video}
              className="h-full w-full object-cover"
              preload="metadata"
              autoPlay
              loop
              muted
            ></video>

            {/* 🔲 Overlay for visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* ❤️💾 Comment Section */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-4 backdrop-blur-md bg-black/20 rounded-2xl p-2">
              {/* ❤️ Like */}
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
                <p className="text-xs opacity-80">{video.likeCount || 0}</p>
              </div>

              {/* 🔖 Save */}
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
                <p className="text-xs opacity-80">{video.savesCount || 0}</p>
              </div>

              {/* 💬 Comment (placeholder) */}
              <div className="flex flex-col items-center space-y-1">
                <div className="p-2 rounded-full bg-black/40 backdrop-blur-lg">
                  <FaComment className="text-xl text-white" />
                </div>
                <p className="text-xs opacity-80">{video.comments || 0}</p>
              </div>
            </div>

            {/* 📝 Description + Visit Button */}
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

      {/* 📱 Bottom Navigation */}
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
