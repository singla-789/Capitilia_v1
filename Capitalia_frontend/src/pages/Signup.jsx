import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/input";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">

      {/* Background image */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Signup card */}
      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="
          bg-white/20
          backdrop-blur-xl
          border border-white/30
          shadow-2xl
          rounded-2xl
          p-10
          animate-fadeIn
        ">

          {/* Heading */}
          <h3 className="text-3xl font-bold text-white text-center mb-3 tracking-wide">
            Create Your Account
          </h3>
          <p className="text-sm text-gray-200 text-center mb-10">
            Start tracking your spendings with clean insights.
          </p>

          {/* Form */}
          <form className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="Enter full name"
                type="text"
              />

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="fullname@example.com"
                type="text"
              />
            </div>

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="*******"
              type="password"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full py-3 
                bg-blue-600 hover:bg-blue-700 
                text-white font-semibold rounded-xl
                transition-all duration-200
                shadow-lg hover:shadow-blue-500/30
              "
            >
              Create Account
            </button>

            {/* Footer */}
            <p className="text-center text-gray-300 text-sm pt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-300 hover:text-blue-200 cursor-pointer underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
