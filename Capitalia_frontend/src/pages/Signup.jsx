import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/input";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/profilePhotoSelector.jsx";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const[profilePhoto,setProfilePhoto] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName.trim()) {
      setIsLoading(false);
      return setError("Please enter your Full Name.");
    }

    if (!validateEmail(email)) {
      setIsLoading(false);
      return setError("Please enter your valid email.");
    }

    if (!password.trim()) {
      setIsLoading(false);
      return setError("Please enter your password");
    }

    // If all validations pass
    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
      });
      if (response.status == 201) {
        toast.success("Profile created successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error("Something went wrong", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div
          className="
          bg-white/20
          backdrop-blur-xl
          border border-white/30
          shadow-2xl
          rounded-2xl
          p-10
          animate-fadeIn
        "
        >
          {/* Heading */}
          <h3 className="text-3xl font-bold text-white text-center mb-3 tracking-wide">
            Create Your Account
          </h3>
          <p className="text-sm text-gray-200 text-center mb-10">
            Start tracking your spendings with clean insights.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex justify-center mb-6">
              <profilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
            </div>
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

            {error && (
              <div className="flex items-center justify-center gap-2 bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg backdrop-blur-md shadow-md">
                <span className="text-lg">⚠️</span>
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xltransition-all duration-200 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin w-6 h-6" />
              ) : (
                "SignUp"
              )}
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
