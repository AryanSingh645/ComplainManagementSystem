import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("/api/admin/verify", {
          withCredentials: true,
        });
        console.log(response, "response in protected route");
        if (!response.data.success) {
          console.log("not verified user");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Session expired. Please login again.");
        console.error("Error verifying user:", error);
        navigate("/login");
      }
    };
    verifyUser();
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
