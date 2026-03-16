import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";


function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const itemsPerPage = 50;
  const navigate = useNavigate();

  // ✅ Open Image Modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  // ✅ Close Image Modal
  const closeImageModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

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
        "https://eclecticabackend-production-ffd4.up.railway.app/admin/dashboard")
      .then((res) => setData(res.data.data))
      .catch((error) => {
        console.error("Error fetching dashboard:", error);
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

  // ✅ Filtered Data (by event and search query)
  const filteredData = useMemo(() => {
    let filtered =
      selectedEvent === "All"
        ? data
        : data.filter((reg) => reg.event === selectedEvent);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (reg) =>
          reg.name.toLowerCase().includes(query) ||
          reg.email.toLowerCase().includes(query) ||
          reg.rollnumber.toLowerCase().includes(query) ||
          reg.contactnumber.includes(query) ||
          reg.college.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [data, selectedEvent, searchQuery]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // ✅ Reset to page 1 when search or event changes
  const handleEventChange = (event) => {
    setSelectedEvent(event);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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
      "UTR Number",
    ];

    const rows = filteredData.map((user) => [
      user.name,
      user.email,
      user.year,
      user.event,
      user.contactnumber,
      user.college,
      formatDate(user.createdAt),
      user.utrNumber || "-",
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
            onClick={() => handleEventChange("All")}
          >
            <h4>All Events</h4>
            <p>{data.length}</p>
          </div>

          {Object.keys(eventCounts).map((event) => (
            <div
              key={event}
              className={`card ${selectedEvent === event ? "active" : ""
                }`}
              onClick={() => handleEventChange(event)}
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
        {/* <button 
          className="download-btn" 
          onClick={() => navigate('/admin/payment-stats')}
          style={{ backgroundColor: '#06D6A0', marginLeft: '10px' }}
        >
          💰 Payment Statistics
        </button> */}
      </div>

      {/* 🔹 Search Bar */}
      <div className="search-section">
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search by Name, Email, Roll No, Phone, or College..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
          >
            Clear
          </button>
        )}
        <span className="search-results">
          {filteredData.length} result{filteredData.length !== 1 ? "s" : ""} found
        </span>
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
                <th>Roll No </th>
                <th>Year</th>
                <th>Event</th>
                <th>Phone</th>
                <th>College</th>
                <th>Registered At</th>
                <th>Payment Screenshot</th>
                <th>UTR Number</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.rollnumber}</td>
                  <td>{user.year}</td>
                  <td>{user.event}</td>
                  <td>{user.contactnumber}</td>
                  <td>{user.college}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    {user.imageUrl || user.razorpay_signature ? (
                      <button 
                        onClick={() => openImageModal(user.imageUrl || user.razorpay_signature)}
                        style={{
                          backgroundColor: '#06D6A0',
                          color: '#000',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}
                      >
                        📸 View Screenshot
                      </button>
                    ) : (
                      <span style={{ color: '#999' }}>No screenshot</span>
                    )}
                  </td>
                  <td>
                    {user.utrNumber ? (
                      <span style={{ fontWeight: 'bold', color: '#06D6A0' }}>{user.utrNumber}</span>
                    ) : (
                      <span style={{ color: '#999' }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Pagination Controls */}
      {!loading && filteredData.length > 0 && (
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="pagination-info">
            <span>
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <span>
              Showing <strong>{startIndex + 1}</strong> to{" "}
              <strong>{Math.min(endIndex, filteredData.length)}</strong> of{" "}
              <strong>{filteredData.length}</strong>
            </span>
          </div>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {/* 🔹 No Results Message */}
      {!loading && filteredData.length === 0 && (
        <div className="no-results">
          <p>No registrations found matching your search criteria.</p>
        </div>
      )}

      {/* 🔹 Image Modal */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={closeImageModal}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '80%',
              maxHeight: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Payment Screenshot" 
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      )}

      {/* 🔹 Logout */}
      
    </div>
  );
}

export default AdminDashboard;
