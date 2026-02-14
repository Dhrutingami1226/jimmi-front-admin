import React, { useState, useEffect } from "react";

const AdminsList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jimmi-backend.onrender.com/api/register/all");
      const data = await response.json();
      if (data.success) {
        setAdmins(data.data);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      showMessage("Error fetching admins", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email
    });
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showMessage("All fields are required", "error");
      return;
    }

    try {
      const response = await fetch(
        `https://jimmi-backend.onrender.com/api/register/${editingAdmin.userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if (data.success) {
        const updatedAdmins = admins.map((a) =>
          a.userId === editingAdmin.userId ? data.data : a
        );
        setAdmins(updatedAdmins);
        setEditingAdmin(null);
        setFormData({ name: "", email: "" });
        showMessage("Admin updated successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleDeleteAdmin = async (userId) => {
    if (!window.confirm("Delete this admin permanently?")) return;

    try {
      const response = await fetch(
        `https://jimmi-backend.onrender.com/api/register/${userId}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();
      if (data.success) {
        const updated = admins.filter((a) => a.userId !== userId);
        setAdmins(updated);
        showMessage("Admin deleted successfully!", "success");
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

  return (
    <div className="admins-list">
      {message && <div className={`form-message ${messageType}`}>{message}</div>}

      <div className="list-header">
        <h2>👥 All Admins</h2>
        <p>Manage registered admin users</p>
      </div>

      {editingAdmin && (
        <form onSubmit={handleUpdateAdmin} className="edit-form">
          <h3>Edit Admin</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Admin name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Admin email"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Update</button>
            <button
              type="button"
              onClick={() => {
                setEditingAdmin(null);
                setFormData({ name: "", email: "" });
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading admins...</p>
      ) : admins.length === 0 ? (
        <p>No admins found.</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.userId}>
                  <td>{admin.userId}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleEditAdmin(admin)}
                      className="action-btn edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.userId)}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminsList;
