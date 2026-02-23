import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";


function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("All");
  const navigate = useNavigate();

  // ✅ Format Date
  const formatDate = (createdAt) => {
    return new Date(createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ✅ Fetch Data
  useEffect(() => {


    axios
      .get(
        "https://eclecticabackend-production.up.railway.app/admin/dashboard")
      .then((res) => setData(res.data.data))
      .catch(() => {
        console.error("Error fetching dashboard:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Count Registrations Per Event
  const eventCounts = useMemo(() => {
    const counts = {};
    data.forEach((reg) => {
      counts[reg.event] = (counts[reg.event] || 0) + 1;
    });
    return counts;
  }, [data]);

  // ✅ Filtered Data
  const filteredData =
    selectedEvent === "All"
      ? data
      : data.filter((reg) => reg.event === selectedEvent);

  // ✅ Download CSV
  const downloadCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Year",
      "Event",
      "Phone",
      "College",
      "Registered At",
    ];

    const rows = filteredData.map((user) => [
      user.name,
      user.email,
      user.year,
      user.event,
      user.contactnumber,
      user.college,
      formatDate(user.createdAt),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedEvent}_registrations.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container">
      <h2 className="admin-heading">Admin Dashboard 👑</h2>

      {/* 🔹 Event Cards */}
      {loading ? (
        <p> </p>
      ) : (
        <div className="card-container">
          <div
            className={`card ${selectedEvent === "All" ? "active" : ""}`}
            onClick={() => setSelectedEvent("All")}
          >
            <h4>All Events</h4>
            <p>{data.length}</p>
          </div>

          {Object.keys(eventCounts).map((event) => (
            <div
              key={event}
              className={`card ${selectedEvent === event ? "active" : ""
                }`}
              onClick={() => setSelectedEvent(event)}
            >
              <h4>{event}</h4>
              <p>{eventCounts[event]}</p>
            </div>
          ))}
        </div>)}

      {/* 🔹 Download Button */}
      <div className="download-section">
        <button className="download-btn" onClick={downloadCSV}>
          Download {selectedEvent} Data
        </button>
      </div>

      {/* 🔹 Loader or Table */}
      {loading ? (
        <div className="loader">
          <PacmanLoader color="#e8c52b" />
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Year</th>
                <th>Event</th>
                <th>Phone</th>
                <th>College</th>
                <th>Registered At</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.year}</td>
                  <td>{user.event}</td>
                  <td>{user.contactnumber}</td>
                  <td>{user.college}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{<a
                    href={user.paymentScreenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Screenshot
                  </a>}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Logout */}
      <button
        className="logout-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
