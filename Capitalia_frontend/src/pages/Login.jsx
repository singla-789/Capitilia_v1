import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/input";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import { validateEmail } from "../util/validation";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateEmail(email)) {
      setIsLoading(false);
      return setError("Please enter your valid email.");
    }

    if (!password.trim()) {
      setIsLoading(false);
      return setError("Please enter your password");
    }

    setError("");

    //login api call

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Backend error (custom message)
        setError(error.response.data.message);
      } else {
        // Network error / axios error
        console.error("Something went wrong", error);
        setError(error.message || "Something went wrong");
      }
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
            Welcome Back
          </h3>
          <p className="text-sm text-gray-200 text-center mb-10">
            Please enter your details to login.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="fullname@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="*******"
              type="password"
            />

            {error && (
              <p className="text-red-800 text-sm  text-center bd-red-50 p-2 rounded">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="
                w-full py-3 
                bg-blue-600 hover:bg-blue-700 
                text-white font-semibold rounded-xl
                transition-all duration-200
                shadow-lg hover:shadow-blue-500/30
              "
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animated-spin w-5 h-5" />
                  Logging in..
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-gray-300 text-sm pt-4">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-300 hover:text-blue-200 cursor-pointer underline"
              >
                SignUp
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
