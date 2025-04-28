import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect( () => {
        const verifyUser = async() => {
            const response = await axios.get('/api/admin/verify', {withCredentials: true});
            if(!response.data.success){
                navigate('/login');
            }
        }
        verifyUser();
    }, [])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute