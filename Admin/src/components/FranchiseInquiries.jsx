import React, { useState, useEffect } from "react";

const FranchiseInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/franchise");
      const data = await response.json();
      if (data.franchises) {
        setInquiries(data.franchises);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      showMessage("Error fetching inquiries", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (inquiryId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/franchise/${inquiryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus })
        }
      );

      const data = await response.json();
      if (data.updatedFranchise || data.message) {
        const updated = inquiries.map((i) =>
          i.userId === inquiryId ? { ...i, status: newStatus } : i
        );
        setInquiries(updated);
        showMessage("Status updated successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm("Delete this inquiry?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/franchise/${inquiryId}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();
      if (data.deletedFranchise || data.message) {
        const updated = inquiries.filter((i) => i.userId !== inquiryId);
        setInquiries(updated);
        showMessage("Inquiry deleted successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const getFilteredInquiries = () => {
    if (statusFilter === "All") return inquiries;
    return inquiries.filter((i) => (i.status || "Pending") === statusFilter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#4caf50";
      case "Rejected":
        return "#f44336";
      default:
        return "#ff9800";
    }
  };

  return (
    <div className="franchise-inquiries">
      {message && <div className={`form-message ${messageType}`}>{message}</div>}

      <div className="list-header">
        <h2>🏢 Franchise Inquiries</h2>
        <p>View and manage franchise applications</p>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-btn ${statusFilter === "All" ? "active" : ""}`}
          onClick={() => setStatusFilter("All")}
        >
          📋 All
        </button>
        <button
          className={`filter-btn ${statusFilter === "Pending" ? "active" : ""}`}
          onClick={() => setStatusFilter("Pending")}
        >
          ⏳ Pending
        </button>
        <button
          className={`filter-btn ${statusFilter === "Approved" ? "active" : ""}`}
          onClick={() => setStatusFilter("Approved")}
        >
          ✅ Approved
        </button>
        <button
          className={`filter-btn ${statusFilter === "Rejected" ? "active" : ""}`}
          onClick={() => setStatusFilter("Rejected")}
        >
          ❌ Rejected
        </button>
      </div>

      {loading ? (
        <p>Loading inquiries...</p>
      ) : getFilteredInquiries().length === 0 ? (
        <p>No franchise inquiries found for {statusFilter === "All" ? "this filter" : statusFilter + " status"}.</p>
      ) : (
        <div className="inquiries-grid">
          {getFilteredInquiries().map((inquiry) => (
            <div key={inquiry.userId} className="inquiry-card">
              <div className="inquiry-header">
                <h3>{inquiry.name}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(inquiry.status || "Pending") }}
                >
                  {inquiry.status || "Pending"}
                </span>
              </div>

              <div className="inquiry-details">
                <p><strong>Email:</strong> {inquiry.email}</p>
                <p><strong>Phone:</strong> {inquiry.phoneno}</p>
                <p><strong>Country:</strong> {inquiry.country}</p>
                <p><strong>State:</strong> {inquiry.state}</p>
                <p><strong>Pincode:</strong> {inquiry.pincode}</p>
                <p><strong>Hours/Month:</strong> {inquiry.hrspmonth}</p>
                <p><strong>Scout Shop:</strong> {inquiry.scoutshop}</p>
                <p><strong>Submitted:</strong> {new Date(inquiry.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="inquiry-actions">
                <select
                  value={inquiry.status || "Pending"}
                  onChange={(e) => handleUpdateStatus(inquiry.userId, e.target.value)}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={() => handleDeleteInquiry(inquiry.userId)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FranchiseInquiries;
