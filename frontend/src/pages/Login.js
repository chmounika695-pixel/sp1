import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosClient";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Left side with illustration */}
        <div style={styles.leftPanel}>
          <div style={styles.leftContent}>
            <div style={styles.illustrationContainer}>
              {/* You can replace this with your own illustration */}
              <div style={styles.illustration}>
                <div style={styles.circle1}></div>
                <div style={styles.circle2}></div>
                <div style={styles.studentIcon}>
                  <svg viewBox="0 0 24 24" width="60" height="60" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>
            <h2 style={styles.welcomeTitle}>Welcome to Our Platform</h2>
            <p style={styles.welcomeText}>
              Sign in to access your personalized dashboard and continue your journey
            </p>
          </div>
        </div>

        {/* Right side with login form */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            {/* Logo/Title */}
            <div style={styles.logoContainer}>
              <h1 style={styles.logoTitle}>STUDENT LOGIN</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Email Input */}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Input */}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Password</label>
                <input
                  style={styles.input}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div style={styles.forgotPassword}>
                <Link to="/forgot-password" style={styles.forgotLink}>
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button type="submit" style={styles.submitButton}>
                LOG IN
              </button>

              {/* Register Link */}
              <div style={styles.registerContainer}>
                <span style={styles.registerText}>New User? </span>
                <Link to="/register" style={styles.registerLink}>
                  Create an account
                </Link>
              </div>
            </form>

            {/* Footer */}
            <div style={styles.footer}>
              <p style={styles.footerText}>
                By continuing, you agree to our Terms of Service & Privacy Policy
              </p>
            </div>
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
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    height: '700px',
    backgroundColor: 'white',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  leftContent: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '400px',
  },
  illustrationContainer: {
    marginBottom: '40px',
  },
  illustration: {
    position: 'relative',
    width: '200px',
    height: '200px',
    margin: '0 auto',
  },
  circle1: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    top: 0,
    left: 0,
  },
  circle2: {
    position: 'absolute',
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    top: '20px',
    left: '20px',
  },
  studentIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  welcomeText: {
    fontSize: '16px',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  logoTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
    letterSpacing: '1px',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  inputLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: '#667eea',
    backgroundColor: 'white',
    outline: 'none',
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '30px',
  },
  forgotLink: {
    color: '#667eea',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  submitButton: {
    width: '100%',
    padding: '18px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#4f46e5',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '24px',
  },
  submitButtonHover: {
    backgroundColor: '#4338ca',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(79, 70, 229, 0.3)',
  },
  registerContainer: {
    textAlign: 'center',
    padding: '20px 0',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
    marginBottom: '30px',
  },
  registerText: {
    fontSize: '14px',
    color: '#666',
  },
  registerLink: {
    color: '#4f46e5',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  footer: {
    textAlign: 'center',
  },
  footerText: {
    fontSize: '12px',
    color: '#999',
    lineHeight: '1.5',
    margin: 0,
  },
};

// Add hover effects
const addHoverEffects = {
  submitButton: {
    ':hover': {
      backgroundColor: '#4338ca',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(79, 70, 229, 0.3)',
    },
  },
  input: {
    ':focus': {
      borderColor: '#667eea',
      backgroundColor: 'white',
      outline: 'none',
    },
  },
  forgotLink: {
    ':hover': {
      color: '#4338ca',
    },
  },
  registerLink: {
    ':hover': {
      color: '#4338ca',
    },
  },
};

// Merge hover effects (in a real app, you'd use CSS classes or styled-components)
Object.keys(addHoverEffects).forEach(key => {
  if (styles[key]) {
    styles[key] = {
      ...styles[key],
      ...addHoverEffects[key],
    };
  }
});

export default Login;