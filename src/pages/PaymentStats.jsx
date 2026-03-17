import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { buildApiUrl, callApiWithFallback } from "../config/api";

function PaymentStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetchPaymentStats(token);
  }, []);

  const fetchPaymentStats = (token) => {
    callApiWithFallback((baseUrl) =>
      axios.get(buildApiUrl(baseUrl, "/admin/payment-stats"), {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      })
    )
      .then((res) => {
        setPaymentData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment stats:", error);
        if (error.response?.status === 401) {
          setError("Unauthorized. Please login to view payment statistics.");
        } else {
          setError("Failed to load payment statistics");
        }
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
        <PacmanLoader color="#36d7b7" size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red", backgroundColor: "#fff5f5", minHeight: "100vh" }}>
        <h3 style={{ color: "#d32f2f" }}>{error}</h3>
        <button onClick={() => navigate("/admin-dashboard")} style={{ padding: "10px 20px", backgroundColor: "#118ab2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const totals = paymentData?.totals || {};
  const byEvent = paymentData?.byEvent || [];

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <h1 style={{ color: "#118ab2", marginBottom: "10px", fontSize: "32px", fontWeight: "bold" }}>💰 Payment Statistics</h1>
      <hr style={{ borderColor: "#06D6A0", marginBottom: "30px" }} />

      {/* Total Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div style={cardStyle}>
          <h3 style={cardHeadingStyle}>Total Amount</h3>
          <p style={{ fontSize: "28px", color: "#06D6A0", fontWeight: "bold" }}>
            ₹{totals.totalAmount?.toLocaleString() || 0}
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardHeadingStyle}>Total Registrations</h3>
          <p style={{ fontSize: "28px", color: "#118ab2", fontWeight: "bold" }}>
            {totals.totalRegistrations || 0}
          </p>
        </div>
      </div>

      {/* Event-wise Breakdown */}
      <h2 style={{ color: "#118ab2", marginTop: "40px", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>Event-wise Breakdown</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={headerStyle}>
              <th>Event Name</th>
              <th>Registrations</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {byEvent.length > 0 ? (
              byEvent.map((event, idx) => (
                <tr key={idx} style={idx % 2 === 0 ? rowStyle : rowAltStyle}>
                  <td style={cellStyle}>{event._id}</td>
                  <td style={cellStyle}>{event.totalRegistrations}</td>
                  <td style={{ ...cellStyle, color: "#06D6A0", fontWeight: "bold" }}>
                    ₹{event.totalAmount?.toLocaleString() || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ ...cellStyle, textAlign: "center", padding: "20px" }}>
                  No payment data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Refresh Button */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={() => {
            setLoading(true);
            const token = localStorage.getItem("adminToken");
            fetchPaymentStats(token);
          }}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#06D6A0",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          🔄 Refresh Data
        </button>
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#118ab2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// Styles
const cardStyle = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
  border: "2px solid #06D6A0"
};

const cardHeadingStyle = {
  color: "#118ab2",
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "10px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  backgroundColor: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  border: "2px solid #06D6A0"
};

const headerStyle = {
  backgroundColor: "#118ab2",
  color: "white",
  fontWeight: "bold",
  padding: "15px",
  fontSize: "14px"
};

const rowStyle = {
  backgroundColor: "#f8f9fa"
};

const rowAltStyle = {
  backgroundColor: "#ffffff"
};

const cellStyle = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
  color: "#333",
  fontWeight: "500"
};

export default PaymentStats;
