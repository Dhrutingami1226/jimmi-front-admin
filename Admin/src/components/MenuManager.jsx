import React, { useState, useEffect } from "react";

const API_URL = "https://jimmi-backend.onrender.com/api/menu";

const MenuManager = ({ onMenuChange }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view");
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.success) {
        setMenus(data.data);
        if (onMenuChange) onMenuChange(data.data); // update frontend instantly
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
      showMessage("Failed to fetch menus", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return showMessage("Name and image are required", "error");

    try {
      setLoading(true);
      const method = editingMenu ? "PUT" : "POST";
      const url = editingMenu ? `${API_URL}/${editingMenu.id}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        let updatedMenus = [];
        if (editingMenu) {
          updatedMenus = menus.map((m) => (m.id === editingMenu.id ? data.data : m));
          showMessage("Menu updated successfully!", "success");
        } else {
          updatedMenus = [...menus, data.data];
          showMessage("Menu added successfully!", "success");
        }
        setMenus(updatedMenus);
        if (onMenuChange) onMenuChange(updatedMenus); // update frontend instantly
        resetForm();
      } else {
        showMessage(data.message || "Operation failed", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        const updated = menus.filter((m) => m.id !== id);
        setMenus(updated);
        if (onMenuChange) onMenuChange(updated); // update frontend instantly
        showMessage("Menu deleted successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      showMessage("Failed to delete menu", "error");
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setFormData({ name: menu.name, image: menu.image });
    setImagePreview(menu.image);
    setActiveTab("add");
  };

  const resetForm = () => {
    setFormData({ name: "", image: "" });
    setImagePreview("");
    setEditingMenu(null);
    setActiveTab("view");
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="menu-manager">
      {message && <div className={`form-message ${messageType}`}>{message}</div>}

      <div className="manager-tabs">
        <button className={`tab-btn ${activeTab === "view" ? "active" : ""}`} onClick={() => setActiveTab("view")}>
          🍔 View Menu
        </button>
        <button className={`tab-btn ${activeTab === "add" ? "active" : ""}`} onClick={() => setActiveTab("add")}>
          {editingMenu ? "✏️ Edit Menu" : "➕ Add Menu"}
        </button>
      </div>

      {activeTab === "view" && (
        <div className="view-section">
          {loading ? (
            <p>Loading menus...</p>
          ) : menus.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            <div className="menu-grid">
              {menus.map((menu) => (
                <div key={menu.id} className="menu-card">
                  <img src={menu.image} alt={menu.name} />
                  <h3>{menu.name}</h3>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(menu)} className="action-btn edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(menu.id)} className="action-btn delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "add" && (
        <form onSubmit={handleSubmit} className="manager-form">
          <h2>{editingMenu ? "Edit Menu Item" : "Add Menu Item"}</h2>
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Image *</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "150px", marginTop: "10px" }} />}
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : editingMenu ? "Update" : "Add"}
          </button>
        </form>
      )}
    </div>
  );
};

export default MenuManager;
