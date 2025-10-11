import React from "react";

function FoodPartnerRegister() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerName = e.target.ownerName.value;
    const restaurantName = e.target.restaurantName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    console.log("Partner registration attempt:");
    console.log("Owner:", ownerName);
    console.log("Restaurant Name:", restaurantName);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Address:", address);
    console.log("Password:", password);

    // Add your registration logic (e.g., API call) here
  }

  return (
    // Dark background with a warm, food-themed gradient (Red theme)
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-red-900 p-6">
      <div
        // Standard div replacing motion.div
        className="bg-black/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/5"
      >
        <h1
          // Standard h1 replacing motion.h1
          className="text-3xl font-bold text-white text-center mb-8"
        >
          Partner Sign Up 🧑‍🍳
        </h1>

        {/* Form with submission handler */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Owner Name Field */}
          <div>
            <label htmlFor="ownerName" className="text-white text-sm font-medium">
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              placeholder="Enter Your Good Name"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-transparent hover:border-white/10"
            />
          </div>

          {/* Restaurant Name Field */}
          <div>
            <label htmlFor="restaurantName" className="text-white text-sm font-medium">
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              placeholder="Enter your restaurant's name"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-transparent hover:border-white/10"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="text-white text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter contact phone number"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-transparent hover:border-white/10"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter partner email"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-transparent hover:border-white/10"
            />
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="text-white text-sm font-medium">
              Restaurant Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter full street address"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-transparent hover:border-white/10"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-white text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create your password"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-transparent hover:border-white/10"
            />
          </div>

          {/* Register Button */}
          <button
            // Uses Tailwind classes to simulate the Framer Motion scale effect on hover/tap
            className="w-full mt-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
            type="submit"
          >
            Register Partner
          </button>

          {/* Existing Link for Partner Login */}
          <p className="text-center text-white/80 mt-5 text-sm">
            Already registered?{" "}
            <a href="/food-partner/login" className="text-orange-400 hover:text-white transition-colors">
              Login
            </a>
          </p>

          {/* New Link for User Registration (Uses Cyan for high contrast) */}
          <p className="text-center text-white/80 mt-2 text-sm pt-2 border-t border-white/10">
            Looking to find food?{" "}
            <a href="/user/register" className="text-cyan-400 hover:text-white transition-colors">
              Register as a User
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default FoodPartnerRegister;
