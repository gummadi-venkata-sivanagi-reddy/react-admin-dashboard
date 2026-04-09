import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard"; // Real Dashboard import
import Employees from "./pages/Employees"; // Real Employees import

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        {/* Main Content Area */}
        <div
          style={{ flex: 1, backgroundColor: "#f8fafc", minHeight: "100vh" }}
        >
          <Routes>
            {/* Real components ni element lo pass cheyyali */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
