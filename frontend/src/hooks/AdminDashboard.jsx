import { createContext, useContext, useState } from "react";

const AdminDashboardContext = createContext({
    complaints: [],
    setComplaints: () => {},
    admin: {},
    setAdmin: () => {}
});

export const AdminDashboardProvider = ({ children }) => {
    const [complaints, setComplaints] = useState([]);
    const [admin, setAdmin] = useState({});

    return (
        <AdminDashboardContext.Provider value={{ complaints, setComplaints, admin, setAdmin }}>
            {children}
        </AdminDashboardContext.Provider>
    );
}

export const useAdminDashboard = () => {
    return useContext(AdminDashboardContext);
}