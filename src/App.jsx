import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tech from "./pages/Tech";
import NonTech from "./pages/NonTech";
import Greeting from "./pages/Greeting";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import PermissionLetter from "./pages/PermissionLetter";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";

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
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
    </Routes>
  );
};

export default App;
