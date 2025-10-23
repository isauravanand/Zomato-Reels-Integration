import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaBookmark, FaComment } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [saved, setSaved] = useState([]);
  const [likes, setLikes] = useState({});
  const [isPartner, setIsPartner] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // 👈 popup state
  const navigate = useNavigate();

  // 🔹 Check if logged-in user is food partner
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food-partner/profile", { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.foodPartner) setIsPartner(true);
      })
      .catch(() => setIsPartner(false));
  }, []);

  // 🔹 Fetch all food videos
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((res) => {
        const items = Array.isArray(res.data.foodItems) ? res.data.foodItems : [];
        setVideos(items);
        const savedVideos = JSON.parse(localStorage.getItem("saved")) || [];
        setSaved(savedVideos);
        const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
        setLikes(storedLikes);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  // ❤️ Handle Like
  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: id },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      const { liked, newLikeCount } = res.data;

      setLikes((prev) => {
        const updated = { ...prev, [id]: liked };
        localStorage.setItem("likes", JSON.stringify(updated));
        return updated;
      });

      setVideos((prevVideos) =>
        prevVideos.map((v) => (v._id === id ? { ...v, likeCount: newLikeCount } : v))
      );
    } catch (err) {
      console.error("Error liking food:", err);
    }
  };

  const handleSave = async (video) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: video._id },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      const message = res.data.message;
      const newSaveCount = res.data.newSaveCount;

      setSaved(prev => {
        let updated;
        if (message.includes("unsaved")) {
          updated = prev.filter(v => v._id !== video._id);
        } else {
          updated = [...prev, video];
        }
        localStorage.setItem("saved", JSON.stringify(updated));
        return updated;
      });

      // ✅ Update the savesCount in UI
      setVideos(prevVideos =>
        prevVideos.map(v => v._id === video._id ? { ...v, savesCount: newSaveCount } : v)
      );

    } catch (err) {
      console.error("Error saving food:", err);
    }
  };



  // 🚪 Actual Logout API call
  const confirmLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      navigate("/user/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white relative">
      {/* 🔹 Logout Icon (Top-right corner) */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowLogoutPopup(true)} // 👈 show confirmation popup
          className="p-2 bg-black/40 rounded-full hover:bg-black/70 transition-all"
          title="Logout"
        >
          <FiLogOut className="text-2xl text-white hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* 🔹 Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl text-center border border-white/10">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-5 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Video Feed */}
      {videos.map((video) => {
        const isLiked = likes[video._id];
        const isSaved = saved.some((v) => v._id === video._id);

        return (
          <div
            key={video._id}
            className="relative h-screen w-full snap-start flex justify-center items-center bg-black"
          >
            <video
              src={video.video}
              className="h-full w-full object-cover"
              preload="metadata"
              autoPlay
              loop
              muted
            ></video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* ❤️💾💬 Action Buttons */}
            {!isPartner && (
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

                {/* 💬 Comment */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="p-2 rounded-full bg-black/40 backdrop-blur-lg">
                    <FaComment className="text-xl text-white" />
                  </div>
                  <p className="text-xs opacity-80">{video.comments || 0}</p>
                </div>
              </div>
            )}

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

      {/* 📱 Bottom Navigation — hide if partner */}
      {!isPartner && (
        <div className="fixed bottom-0 left-0 w-full bg-black/60 backdrop-blur-md flex justify-around items-center py-3 border-t border-gray-700">
          {/* <Link
            to="/"
            className="flex flex-col items-center text-white opacity-90 hover:opacity-100"
          >
            <FaHeart className="text-xl mb-1" />
            <span className="text-xs">Home</span>
          </Link> */}
          <Link
            to="/saved"
            className="flex flex-col items-center text-white opacity-90 hover:opacity-100"
          >
            <FaBookmark className="text-xl mb-1" />
            <span className="text-xs">Saved</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
