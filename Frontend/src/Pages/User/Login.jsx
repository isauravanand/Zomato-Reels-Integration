import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State for loader

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/user/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);
            setLoading(false); // Hide loader
            navigate("/"); // Navigate to home route
        } catch (error) {
            console.error("Error during login:", error);
            setLoading(false); // Hide loader in case of error
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 p-6">
            {loading ? (
                <div className="flex flex-col items-center justify-center">
                    {/* Loader */}
                    <div className="loader border-t-4 border-cyan-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
                    <p className="text-lg font-semibold text-gray-300">Logging in...</p>
                </div>
            ) : (
                <div className="bg-black/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/5">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Welcome Back
                    </h1>

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
                                placeholder="Enter your email"
                                className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all border border-transparent hover:border-white/10"
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
                                className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all border border-transparent hover:border-white/10"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            className="w-full mt-6 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-cyan-600 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
                            type="submit"
                        >
                            Login
                        </button>

                        {/* Registration Link */}
                        <p className="text-center text-white/80 mt-5 text-sm">
                            Don't have an account?{" "}
                            <a href="/user/register" className="text-cyan-400 hover:text-white transition-colors">
                                Register
                            </a>
                        </p>
                        <p className="text-center text-white/80 mt-2 text-sm pt-2 border-t border-white/10">
                            Want to Join us?{" "}
                            <a href="/food-partner/register" className="text-orange-400 hover:text-white transition-colors">
                                Register as a Food Partner
                            </a>
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;