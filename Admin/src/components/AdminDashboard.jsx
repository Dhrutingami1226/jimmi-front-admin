import React, { useState, useEffect } from "react";
import StoreForm from "./StoreForm";
import StoreList from "./StoreList";
import StoreSearch from "./StoreSearch";
import CarouselManager from "./CarouselManager";
import OffersManager from "./OffersManager";
import MenuManager from "./MenuManager";
import AdminsList from "./AdminsList";
import FranchiseInquiries from "./FranchiseInquiries";

const AdminDashboard = ({ admin, onLogout }) => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stores");
  const [storeView, setStoreView] = useState("list");
  const [selectedStore, setSelectedStore] = useState(null);
  const [editingStore, setEditingStore] = useState(null);

  useEffect(() => {
    fetchAllStores();
  }, []);

  const fetchAllStores = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jimmi-backend.onrender.com/api/stores");
      const data = await response.json();
      if (data.success) {
        setStores(data.data);
        setFilteredStores(data.data);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStore = async (storeData) => {
    try {
      const response = await fetch("https://jimmi-backend.onrender.com/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storeData)
      });

      const data = await response.json();
      if (data.success) {
        setStores([...stores, data.data]);
        setFilteredStores([...stores, data.data]);
        setStoreView("list");
        setEditingStore(null);
        return { success: true, message: "Store added successfully!" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleUpdateStore = async (storeData) => {
    try {
      const response = await fetch(
        `https://jimmi-backend.onrender.com/api/stores/${editingStore.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storeData)
        }
      );

      const data = await response.json();
      if (data.success) {
        const updatedStores = stores.map((store) =>
          store.id === editingStore.id ? data.data : store
        );
        setStores(updatedStores);
        setFilteredStores(updatedStores);
        setEditingStore(null);
        setStoreView("list");
        return { success: true, message: "Store updated successfully!" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleDeleteStore = async (id) => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;

    try {
      const response = await fetch(`https://jimmi-backend.onrender.com/api/stores/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (data.success) {
        const updatedStores = stores.filter((store) => store.id !== id);
        setStores(updatedStores);
        setFilteredStores(updatedStores);
        return { success: true, message: "Store deleted successfully!" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleSearchStores = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredStores(stores);
      return;
    }

    try {
      const response = await fetch(
        `https://jimmi-backend.onrender.com/api/stores/search?name=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (data.success) {
        setFilteredStores(data.data);
      }
    } catch (error) {
      console.error("Error searching stores:", error);
    }
  };

  const handleEditStore = (store) => {
    setEditingStore(store);
    setStoreView("form");
  };

  const handleAddNewStore = () => {
    setEditingStore(null);
    setStoreView("form");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {admin?.name || admin?.email}</p>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === "stores" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("stores");
            setEditingStore(null);
            setStoreView("list");
          }}
        >
          🏪 Stores
        </button>
        <button
          className={`tab-btn ${activeTab === "carousel" ? "active" : ""}`}
          onClick={() => setActiveTab("carousel")}
        >
          📷 Carousel
        </button>
        <button
          className={`tab-btn ${activeTab === "offers" ? "active" : ""}`}
          onClick={() => setActiveTab("offers")}
        >
          🎁 Offers
        </button>
        <button
          className={`tab-btn ${activeTab === "menu" ? "active" : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          🍔 Menu
        </button>
        <button
          className={`tab-btn ${activeTab === "admins" ? "active" : ""}`}
          onClick={() => setActiveTab("admins")}
        >
          👥 Admins
        </button>
        <button
          className={`tab-btn ${activeTab === "franchise" ? "active" : ""}`}
          onClick={() => setActiveTab("franchise")}
        >
          🏢 Franchise
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "stores" && (
          <div className="tab-content">
            {storeView === "list" && (
              <>
                <StoreSearch onSearch={handleSearchStores} />
                <button 
                  className="add-btn" 
                  onClick={handleAddNewStore}
                  style={{margin: "15px 0", padding: "10px 20px", backgroundColor: "#eda62e", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1rem", fontWeight: "600"}}
                >
                  ➕ Add New Store
                </button>
                {loading ? (
                  <p>Loading stores...</p>
                ) : (
                  <StoreList
                    stores={filteredStores}
                    onEdit={handleEditStore}
                    onDelete={handleDeleteStore}
                  />
                )}
              </>
            )}
            {storeView === "form" && (
              <div className="modal-form">
                <button 
                  className="back-btn"
                  onClick={() => {
                    setStoreView("list");
                    setEditingStore(null);
                  }}
                  style={{marginBottom: "15px", padding: "8px 16px", backgroundColor: "#666", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}
                >
                  ← Back to List
                </button>
                <StoreForm
                  onSubmit={editingStore ? handleUpdateStore : handleAddStore}
                  initialData={editingStore}
                  isEditing={!!editingStore}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "carousel" && <CarouselManager />}
        {activeTab === "offers" && <OffersManager />}
        {activeTab === "menu" && <MenuManager />}
        {activeTab === "admins" && <AdminsList />}
        {activeTab === "franchise" && <FranchiseInquiries />}
      </div>
    </div>
  );
};

export default AdminDashboard;
