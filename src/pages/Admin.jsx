import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { buildApiUrl, callApiWithFallback } from '../config/api'

const Admin = () => {
    const[loading,setLoading]=useState(false);
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate=useNavigate();


    const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await callApiWithFallback((baseUrl) =>
        axios.post(buildApiUrl(baseUrl, '/admin/login'), { email, password }, { timeout: 15000 })
      );

      localStorage.setItem('adminToken', res.data.token);
      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setLoading(false);
      if (err?.response?.status === 401) {
        alert('Invalid admin credentials');
      } else {
        alert('Unable to connect to backend. Please try again in a moment.');
      }
    }
  };



  return (
    <div className="admin-login-container">
  <div className="admin-login-card">
    <h2>Admin Login</h2>

    <input
      type="email"
      placeholder="Email"
      required
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      required
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>Login</button>
  </div>
</div>

  )
}

export default Admin