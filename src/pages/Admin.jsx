import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Admin = () => {
    const[loading,setLoading]=useState(false);
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate=useNavigate();


    const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://eclectica-backend.onrender.com/admin/login',
        { email, password }
      );

      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Invalid admin credentials');
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