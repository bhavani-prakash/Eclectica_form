import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Greeting from "./pages/Greeting";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/greeting" element={<Greeting />} />
      <Route path="/admin-loginECE" element={<Admin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
    </Routes>
  );
};

export default App;
