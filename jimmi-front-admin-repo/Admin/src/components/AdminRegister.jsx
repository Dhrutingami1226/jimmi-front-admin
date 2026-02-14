import React, { useState } from "react";

const AdminRegister = ({ onRegisterSuccess, onShowMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      onShowMessage("Please fill in all fields", "error");
      return;
    }

    if (formData.password.length < 6) {
      onShowMessage("Password must be at least 6 characters", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://jimmi-backend.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      onShowMessage("Registration successful! Please login.", "success");
      onRegisterSuccess(data.user);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      onShowMessage(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Admin Register</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
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
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password (min 6 characters)"
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default AdminRegister;
