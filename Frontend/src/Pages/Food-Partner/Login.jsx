import React from "react";

function FoodPartnerLogin() {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log("Partner login attempt:");
        console.log("Email:", email);
        console.log("Password:", password);

        // Add your actual authentication logic here
    }

    return (
        // Dark background with a warm, food-themed gradient (Red theme)
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-red-900 p-6">
            {/* Standard div replacing motion.div */}
            <div
                className="bg-black/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/5"
            >
                {/* Standard h1 replacing motion.h1 */}
                <h1
                    className="text-3xl font-bold text-white text-center mb-8"
                >
                    Partner Login 🔑
                </h1>

                {/* Form with onSubmit handler */}
                <form className="space-y-5" onSubmit={handleSubmit}>

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
                            // Input focus ring uses orange
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
                            placeholder="Enter your password"
                            // Input focus ring uses orange
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-transparent hover:border-white/10"
                        />
                    </div>

                    {/* Login Button (Orange/Red Gradient) */}
                    <button
                        // Uses Tailwind classes to simulate the Framer Motion scale effect on hover/tap
                        className="w-full mt-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
                        type="submit"
                    >
                        Login
                    </button>

                    {/* Link for Partner Registration */}
                    <p className="text-center text-white/80 mt-5 text-sm">
                        Don't have an account?{" "}
                        <a href="/food-partner/register" className="text-orange-400 hover:text-white transition-colors">
                            Register Now
                        </a>
                    </p>

                    {/* Link for User Registration (Uses Cyan for high contrast) */}
                    <p className="text-center text-white/80 mt-2 text-sm pt-2 border-t border-white/10">
                        Looking to find food?{" "}
                        <a href="/user/register" className="text-cyan-400 hover:text-white transition-colors">
                            Login as a User
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default FoodPartnerLogin;
