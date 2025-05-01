import React, { use, useEffect, useState } from 'react'
import AdminPanel from '../components/AdminPanel'
import { useNavigate } from 'react-router-dom'
import { useAdminDashboard } from '../hooks/AdminDashboard';
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axiosInstance';

const AdminDashboard = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(true);
  const navigate = useNavigate();
  const { setComplaints } = useAdminDashboard();

  useEffect(() => {
    const verifyUser = async() => {
      const response = await axiosInstance.get('/api/admin/getDashboardData')
      console.log(response.data, "response in admin dashboard");
      if(response.data.success){
        setComplaints(response.data.dashBoard);
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
        // navigate('/login');
      }
    }
    verifyUser();
  }, [])
  useEffect(() => {
    console.log(isVerified, "isVerified");
    setRedirectToLogin(isVerified);
  }, [isVerified])
  // console.log(isVerified, "isVerified");
  return (
    <AdminPanel/>
  )
}

export default AdminDashboard