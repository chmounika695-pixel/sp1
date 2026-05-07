import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* HEADER WITH SCHOLARHUB TITLE */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>ScholarHub</h1>
      </div>

      <div style={styles.contentWrapper}>
        {/* LEFT SIDE – REGISTER */}
        <div style={{ ...styles.panel, backgroundColor: "#1e6cff" }}>
          <h2 style={styles.title}>I'm New Here</h2>
          <p style={styles.text}>
            Create an account and get personalized scholarship recommendations.
          </p>
          <Link to="/register" style={styles.button}>
            Register
          </Link>
        </div>

        {/* RIGHT SIDE – LOGIN */}
        <div style={{ ...styles.panel, backgroundColor: "#5dade2" }}>
          <h2 style={styles.title}>Already a User</h2>
          <p style={styles.text}>
            Login to view your dashboard and eligible scholarships.
          </p>
          <Link to="/login" style={styles.button}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    padding: "20px 40px",
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  headerTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
    letterSpacing: "1px",
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
  },
  panel: {
    flex: 1,
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "16px",
  },
  text: {
    fontSize: "16px",
    maxWidth: "300px",
    textAlign: "center",
    marginBottom: "24px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "white",
    color: "#000",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Home;