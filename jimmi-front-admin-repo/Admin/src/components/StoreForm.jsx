import React, { useState, useEffect } from "react";

const StoreForm = ({ onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    mapLink: "",
    image: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
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

    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      !formData.mapLink ||
      !formData.image
    ) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setLoading(true);
    const result = await onSubmit(formData);
    setLoading(false);

    if (result.success) {
      setMessage(result.message);
      setMessageType("success");
      if (!isEditing) {
        setFormData({
          name: "",
          address: "",
          phone: "",
          mapLink: "",
          image: ""
        });
        setImageFile(null);
        setImagePreview("");
      }
    } else {
      setMessage(result.message);
      setMessageType("error");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="store-form-container">
      {message && <div className={`form-message ${messageType}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="store-form">
        <h2>{isEditing ? "Edit Store" : "Add New Store"}</h2>

        <div className="form-group">
          <label htmlFor="name">Store Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Marol"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full store address"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 09167090720"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mapLink">Google Maps Link *</label>
          <input
            type="url"
            id="mapLink"
            name="mapLink"
            value={formData.mapLink}
            onChange={handleChange}
            placeholder="https://maps.app.goo.gl/..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Store Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading
            ? isEditing
              ? "Updating..."
              : "Adding..."
            : isEditing
            ? "Update Store"
            : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default StoreForm;
