import React, { useState, useEffect } from "react";

const MenuManager = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view");
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jimmi-backend.onrender.com/api/menu");
      const data = await response.json();
      if (data.success) {
        setMenus(data.data);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
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

  const handleAddMenu = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      showMessage("Name and image are required", "error");
      return;
    }

    try {
      const response = await fetch("https://jimmi-backend.onrender.com/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setMenus([...menus, data.data]);
        setFormData({ name: "", image: "" });
        setImagePreview("");
        setActiveTab("view");
        showMessage("Menu item added successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleUpdateMenu = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      showMessage("Name and image are required", "error");
      return;
    }

    try {
      const response = await fetch(
        `https://jimmi-backend.onrender.com/api/menu/${editingMenu.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if (data.success) {
        const updatedMenus = menus.map((m) =>
          m.id === editingMenu.id ? data.data : m
        );
        setMenus(updatedMenus);
        setFormData({ name: "", image: "" });
        setImagePreview("");
        setEditingMenu(null);
        setActiveTab("view");
        showMessage("Menu item updated successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    try {
      const response = await fetch(`https://jimmi-backend.onrender.com/api/menu/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (data.success) {
        const updated = menus.filter((m) => m.id !== id);
        setMenus(updated);
        showMessage("Menu item deleted successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      image: menu.image
    });
    setImagePreview(menu.image);
    setActiveTab("add");
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
        <button
          className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("view");
            setEditingMenu(null);
          }}
        >
          🍔 View Menu
        </button>
        <button
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          {editingMenu ? "✏️ Edit Menu" : "➕ Add Menu"}
        </button>
      </div>

      {activeTab === "view" && (
        <div className="view-section">
          {loading ? (
            <p>Loading menu items...</p>
          ) : menus.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            <div className="menu-grid">
              {menus.map((menu) => (
                <div key={menu.id} className="menu-card">
                  <img src={menu.image} alt={menu.name} />
                  <h3>{menu.name}</h3>
                  <p className="category">{menu.category}</p>
                  <p className="description">{menu.description}</p>
                  <div className="card-actions">
                    <button
                      onClick={() => handleEditMenu(menu)}
                      className="action-btn edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMenu(menu.id)}
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
      )}

      {activeTab === "add" && (
        <form
          onSubmit={editingMenu ? handleUpdateMenu : handleAddMenu}
          className="manager-form"
        >
          <h2>{editingMenu ? "Edit Menu Item" : "Add Menu Item"}</h2>

          <div className="form-group">
            <label htmlFor="name">Menu Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Menu item name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Menu Image *</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>



          <button type="submit" className="submit-btn">
            {editingMenu ? "Update Menu Item" : "Add Menu Item"}
          </button>
        </form>
      )}
    </div>
  );
};

export default MenuManager;
