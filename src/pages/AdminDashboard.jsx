import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

const last24HoursCount = data.filter((reg) => {
  const createdTime = new Date(reg.createdAt).getTime();
  const now = Date.now();

  return now - createdTime <= 24 * 60 * 60 * 1000;
}).length;
  


  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      navigate('/');
      return;
    }

    axios.get('https://eclecticabackend-production.up.railway.app/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setData(res.data.data))
    .catch(() => {
      localStorage.removeItem('adminToken');
      navigate('/');
    });
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Admin Dashboard 👑</h2><br></br>
      <h3> Total Registrations: {data.length} </h3>
      <h3> Registrations in Last 24 Hours: {last24HoursCount} </h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Year </th>
            <th>Event</th>
            <th>Phone</th>
            <th>College</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.year}</td>
              <td>{user.event}</td>
              <td>{user.contactnumber}</td>
              <td>{user.college}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => {
        localStorage.removeItem('adminToken');
        navigate('/admin-loginECE');
      }}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
