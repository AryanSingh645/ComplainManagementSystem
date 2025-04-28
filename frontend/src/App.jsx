// import './App.css'
import { ThemeToggleProvider } from "./hooks/ThemeToggle";
import AdminDashboard from "./pages/AdminDashboard";
import Complain from "./pages/Complain";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { AdminDashboardProvider } from "./hooks/AdminDashboard";
function App() {
  return (
    <ThemeToggleProvider>
      <AdminDashboardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Complain />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AdminDashboardProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeToggleProvider>
  );
}

export default App;
