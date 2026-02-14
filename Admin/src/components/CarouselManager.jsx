import React, { useState, useEffect } from "react";

const CarouselManager = () => {
  const [carousels, setCarousels] = useState([]);
  const [filteredCarousels, setFilteredCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view");
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [formData, setFormData] = useState({
    image: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/carousel");
      const data = await response.json();
      if (data.success) {
        setCarousels(data.data);
        setFilteredCarousels(data.data);
      }
    } catch (error) {
      console.error("Error fetching carousels:", error);
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

  const handleAddCarousel = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      showMessage("Image is required", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/carousel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setCarousels([...carousels, data.data]);
        setFilteredCarousels([...carousels, data.data]);
        setFormData({ image: "" });
        setImagePreview("");
        setActiveTab("view");
        showMessage("Carousel added successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleUpdateCarousel = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      showMessage("Image is required", "error");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/carousel/${editingCarousel.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if (data.success) {
        const updatedCarousels = carousels.map((c) =>
          c.id === editingCarousel.id ? data.data : c
        );
        setCarousels(updatedCarousels);
        setFilteredCarousels(updatedCarousels);
        setFormData({ image: "" });
        setImagePreview("");
        setEditingCarousel(null);
        setActiveTab("view");
        showMessage("Carousel updated successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleDeleteCarousel = async (id) => {
    if (!window.confirm("Delete this carousel?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/carousel/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (data.success) {
        const updated = carousels.filter((c) => c.id !== id);
        setCarousels(updated);
        setFilteredCarousels(updated);
        showMessage("Carousel deleted successfully!", "success");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleEditCarousel = (carousel) => {
    setEditingCarousel(carousel);
    setFormData({
      image: carousel.image
    });
    setImagePreview(carousel.image);
    setActiveTab("add");
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="carousel-manager">
      {message && <div className={`form-message ${messageType}`}>{message}</div>}

      <div className="manager-tabs">
        <button
          className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("view");
            setEditingCarousel(null);
          }}
        >
          📷 View Carousels
        </button>
        <button
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          {editingCarousel ? "✏️ Edit Carousel" : "➕ Add Carousel"}
        </button>
      </div>

      {activeTab === "view" && (
        <div className="view-section">
          {loading ? (
            <p>Loading carousels...</p>
          ) : filteredCarousels.length === 0 ? (
            <p>No carousels found.</p>
          ) : (
            <div className="carousel-grid">
              {filteredCarousels.map((carousel) => (
                <div key={carousel.id} className="carousel-preview-card">
                  <img src={carousel.image} alt={carousel.title} />
                  <h3>{carousel.title}</h3>
                  <p>{carousel.description}</p>
                  <div className="card-actions">
                    <button
                      onClick={() => handleEditCarousel(carousel)}
                      className="action-btn edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCarousel(carousel.id)}
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
          onSubmit={editingCarousel ? handleUpdateCarousel : handleAddCarousel}
          className="manager-form"
        >
          <h2>{editingCarousel ? "Edit Carousel" : "Add Carousel"}</h2>

          <div className="form-group">
            <label htmlFor="image">Carousel Image *</label>
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
            {editingCarousel ? "Update Carousel" : "Add Carousel"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CarouselManager;
