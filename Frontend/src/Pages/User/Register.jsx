import React from "react";

function Register() {
    const handleSubmite = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);

        // Add your actual registration logic here (e.g., API call)
    }

    return (
        // Dark background gradient
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 p-6">
            {/* Replaced motion.div with standard div */}
            <div
                className="bg-black/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/5"
            >
                {/* Replaced motion.h1 with standard h1 */}
                <h1
                    className="text-3xl font-bold text-white text-center mb-8"
                >
                    Create an Account
                </h1>

                {/* Added onSubmit handler to the form */}
                <form className="space-y-5" onSubmit={handleSubmite}>

                    {/* Username Field (Replaced motion.div) */}
                    <div>
                        <label htmlFor="username" className="text-white text-sm font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username" // Added name prop for easy form handling
                            placeholder="Enter your username"
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all border border-transparent hover:border-white/10"
                        />
                    </div>

                    {/* Email Field (Replaced motion.div) */}
                    <div>
                        <label htmlFor="email" className="text-white text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email" // Added name prop
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all border border-transparent hover:border-white/10"
                        />
                    </div>

                    {/* Password Field (Replaced motion.div) */}
                    <div>
                        <label htmlFor="password" className="text-white text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password" // Added name prop
                            placeholder="Enter your password"
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all border border-transparent hover:border-white/10"
                        />
                    </div>

                    {/* Register Button (Replaced motion.button with standard button) */}
                    <button
                        // Simulated Framer Motion effects with Tailwind classes
                        className="w-full mt-6 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-cyan-600 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
                        type="submit"
                    >
                        Register
                    </button>

                    <p className="text-center text-white/80 mt-5 text-sm">
                        Already have an account?{" "}
                        <a href="/user/login" className="text-cyan-400 hover:text-white transition-colors">
                            Login
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

export default Register;