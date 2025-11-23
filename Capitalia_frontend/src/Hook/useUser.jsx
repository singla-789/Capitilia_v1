import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";

export const useUser = () => {
  const { user, setUser, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      clearUser();
      return navigate("/login");
    }

    // If user already loaded, don't fetch again
    if (user) return;

    const fetchUser = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO); // /profiles
        setUser(response.data);
      } catch (error) {
        clearUser();
        navigate("/login");
      }
    };

    fetchUser();
  }, [user, setUser, clearUser, navigate]);
};
