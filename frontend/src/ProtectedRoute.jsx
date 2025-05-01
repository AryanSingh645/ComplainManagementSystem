import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./utils/axiosInstance";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/admin/verify");
        console.log(response, "response in protected route");
        if (!response.data.success) {
          console.log("not verified user");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Session expired. Please login again.");
        console.error("Error verifying user:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    verifyUser();
  }, []);
  return <div>{isLoading ? <p>Loading...</p> : children}</div>;
};

export default ProtectedRoute;
