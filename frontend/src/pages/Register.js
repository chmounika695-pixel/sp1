import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosClient";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-page-wrapper" style={styles.pageWrapper}>
      <div className="auth-card" style={styles.authCard}>
        {/* LEFT – form */}
        <div className="auth-main" style={styles.authMain}>
          <div style={styles.header}>
            <h1 style={styles.title}>Create your account</h1>
            <p style={styles.subtitle}>
              Register once, update your profile, and we'll show you every
              scholarship you are eligible for based on your background.
            </p>
          </div>

          {/* Email login option */}
          <div style={styles.socialSection}>
            <div style={styles.socialToggle}>
              <button
                type="button"
                style={{
                  ...styles.socialToggleBtn,
                  ...styles.socialToggleBtnActive
                }}
              >
                Email
              </button>
            </div>
            <p style={styles.socialText}>or use your email account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" style={styles.form}>
            <label className="auth-label" style={styles.label}>
              <input
                className="auth-input"
                style={styles.input}
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-label" style={styles.label}>
              <input
                className="auth-input"
                style={styles.input}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-label" style={styles.label}>
              <input
                className="auth-input"
                style={styles.input}
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <div style={styles.forgotPassword}>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot your password?
              </Link>
            </div>

            <button type="submit" className="auth-primary-btn" style={styles.submitBtn}>
              Register
            </button>
          </form>

          <div className="auth-footer-text" style={styles.footer}>
            Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
          </div>
        </div>

        {/* RIGHT – coloured panel */}
        <div className="auth-side-panel register" style={styles.sidePanel}>
          <div className="auth-side-content" style={styles.sideContent}>
            <div style={styles.sideHeader}>
              <h2 style={styles.sideTitle}>Start your scholarship journey</h2>
              <p style={styles.sideText}>
                Create your profile once and instantly see scholarships filtered
                by caste, income, course, marks and more.
              </p>
            </div>
            <img
              src="/scholarship-register.jpg"
              alt="Students with books"
              style={styles.sideImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  authCard: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    height: '700px',
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  authMain: {
    flex: 1,
    padding: '60px 50px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  header: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
    margin: 0,
  },
  socialSection: {
    marginBottom: '30px',
  },
  socialToggle: {
    display: 'flex',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '4px',
    marginBottom: '15px',
  },
  socialToggleBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'default',
  },
  socialToggleBtnActive: {
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  socialText: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    margin: 0,
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '30px',
  },
  forgotLink: {
    fontSize: '14px',
    color: '#666',
    textDecoration: 'none',
  },
  submitBtn: {
    padding: '16px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footer: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    marginTop: '30px',
  },
  link: {
    color: '#000',
    fontWeight: '600',
    textDecoration: 'none',
  },
  sidePanel: {
    flex: 1,
    backgroundColor: '#4a90e2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px 50px',
    position: 'relative',
    overflow: 'hidden',
  },
  sideContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  sideHeader: {
    marginBottom: '40px',
  },
  sideTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 20px 0',
  },
  sideText: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.5',
    margin: 0,
  },
  sideImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: '12px',
  },
};

export default Register;