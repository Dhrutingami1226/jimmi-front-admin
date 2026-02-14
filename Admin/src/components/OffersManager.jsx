import React, { useState, useEffect } from "react";

const OffersManager = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view");
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: ""
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/offers");
      const data = await response.json();
      if (data.success) {
        setOffers(data.data);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOffer = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      showMessage("Title is required", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setOffers([...offers, data.data]);
        setFormData({ title: "" });
        setActiveTab("view");
        showMessage("Offer added successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleUpdateOffer = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      showMessage("Title is required", "error");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/offers/${editingOffer.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if (data.success) {
        const updatedOffers = offers.map((o) =>
          o.id === editingOffer.id ? data.data : o
        );
        setOffers(updatedOffers);
        setFormData({ title: "" });
        setEditingOffer(null);
        setActiveTab("view");
        showMessage("Offer updated successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm("Delete this offer?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/offers/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (data.success) {
        const updated = offers.filter((o) => o.id !== id);
        setOffers(updated);
        showMessage("Offer deleted successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title
    });
    setActiveTab("add");
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="offers-manager">
      {message && <div className={`form-message ${messageType}`}>{message}</div>}

      <div className="manager-tabs">
        <button
          className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("view");
            setEditingOffer(null);
          }}
        >
          🎁 View Offers
        </button>
        <button
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          {editingOffer ? "✏️ Edit Offer" : "➕ Add Offer"}
        </button>
      </div>

      {activeTab === "view" && (
        <div className="view-section">
          {loading ? (
            <p>Loading offers...</p>
          ) : offers.length === 0 ? (
            <p>No offers found.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{offer.id}</td>
                    <td>{offer.title}</td>
                    <td>
                      <button
                        onClick={() => handleEditOffer(offer)}
                        className="action-btn edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="action-btn delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "add" && (
        <form
          onSubmit={editingOffer ? handleUpdateOffer : handleAddOffer}
          className="manager-form"
        >
          <h2>{editingOffer ? "Edit Offer" : "Add Offer"}</h2>

          <div className="form-group">
            <label htmlFor="title">Offer Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter offer title"
            />
          </div>

          <button type="submit" className="submit-btn">
            {editingOffer ? "Update Offer" : "Add Offer"}
          </button>
        </form>
      )}
    </div>
  );
};

export default OffersManager;
