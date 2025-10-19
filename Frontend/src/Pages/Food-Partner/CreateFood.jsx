import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    video: null,
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); // State for loader

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      setFormData({ ...formData, video: acceptedFiles[0] });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("video", formData.video);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/",
        formDataToSend,
        { withCredentials: true }
      );
      console.log(response.data);
      setLoading(false); // Hide loader
      navigate("/"); // Navigate to home route
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false); // Hide loader in case of error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          {/* Loader */}
          <div className="loader border-t-4 border-orange-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
          <p className="text-lg font-semibold text-gray-300">Saving food item...</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-orange-500">Create Food</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            {/* Video Input */}
            <div className="mb-4">
              <label
                htmlFor="video"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Video
              </label>
              <div
                {...getRootProps()}
                className={`w-full p-4 rounded-lg bg-gray-600 text-white text-center cursor-pointer border-2 ${isDragActive ? "border-orange-500" : "border-gray-500"
                  }`}
              >
                <input {...getInputProps()} />
                {formData.video ? (
                  <p className="text-sm text-gray-300">
                    {formData.video.name} (Ready to upload)
                  </p>
                ) : (
                  <p className="text-sm text-gray-300">
                    Drag and drop a video file here, or click to browse
                  </p>
                )}
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter food name"
                className="w-full p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter food description"
                className="w-full p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="4"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
            >
              Create Food
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateFood;