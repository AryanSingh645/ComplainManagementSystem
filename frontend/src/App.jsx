// import './App.css'
import { ThemeToggleProvider } from "./hooks/ThemeToggle";
import AdminDashboard from "./pages/AdminDashboard";
import Complain from "./pages/Complain";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <ThemeToggleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Complain />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeToggleProvider>
  );
}

export default App;
