import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tech from "./pages/Tech";
import NonTech from "./pages/NonTech";
import Greeting from "./pages/Greeting";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import PermissionLetter from "./pages/PermissionLetter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Home />} />
      <Route path="/tech" element={<Tech />} />
      <Route path="/nontech" element={<NonTech />} />
      <Route path="/greeting" element={<Greeting />} />
      <Route path="/admin-loginECE" element={<Admin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/permission-letter" element={<PermissionLetter />} />
    </Routes>
  );
};

export default App;
