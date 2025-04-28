import { createContext, useContext, useState } from "react";

const AdminDashboardContext = createContext({
    complaints: [],
    setComplaints: () => {},
});

export const AdminDashboardProvider = ({ children }) => {
    const [complaints, setComplaints] = useState([]);

    return (
        <AdminDashboardContext.Provider value={{ complaints, setComplaints }}>
            {children}
        </AdminDashboardContext.Provider>
    );
}

export const useAdminDashboard = () => {
    return useContext(AdminDashboardContext);
}