import React from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

       const response = await axios.post("http://localhost:3000/api/auth/user/login",{
        email:email,
        password:password,
       },{
        withCredentials:true,
       })

       console.log(response.data);
       navigate("/")
    }

    return (
        // Deep, dark gradient background (Indigo theme)
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 p-6">
            {/* Standard div replacing motion.div */}
            <div
                // Darkened glass effect container
                className="bg-black/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/5"
            >
                {/* Standard h1 replacing motion.h1 */}
                <h1
                    className="text-3xl font-bold text-white text-center mb-8"
                >
                    Welcome Back
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
                            placeholder="Enter your email"
                            // Input focus ring uses cyan
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
                            // Input focus ring uses cyan
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all border border-transparent hover:border-white/10"
                        />
                    </div>

                    {/* Login Button (Indigo/Cyan Gradient) */}
                    <button
                        // Uses Tailwind classes to simulate the Framer Motion scale effect on hover/tap
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
        </div>
    );
}

export default Login;
