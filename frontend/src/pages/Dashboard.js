import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import ApplyModal from "../components/ApplyModal";
import ReminderModal from "../components/ReminderModal";
const Dashboard = () => {
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/scholarships")
      .then((res) => {
        setScholarships(res.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const eligible = scholarships.filter((s) => s.eligible);
  const recommended = scholarships.filter((s) => s.matchScore >= 70);

  return (
    <div style={styles.pageWrapper}>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h2 style={styles.heroTitle}>Scholarship for Future</h2>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.dashboardContent}>
        <div style={styles.dashboardHero}>
          <h1 style={styles.dashboardTitle}>Your Scholarship Dashboard</h1>
          <p style={styles.dashboardSub}>
            Based on your profile, scholarships are grouped into Eligible and Recommended.
          </p>
        </div>

        <div style={styles.cardsContainer}>
          {/* ELIGIBLE SCHOLARSHIPS */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Eligible Scholarships</h3>
            <p style={styles.cardDescription}>
              Scholarships where you fully meet the eligibility criteria.
            </p>

            <div style={styles.cardList}>
              {eligible.length === 0 ? (
                <div style={styles.emptyItem}>
                  No eligible scholarships yet.
                </div>
              ) : (
                eligible.map((s) => (
                  <div key={s._id} style={styles.listItem}>
                    <span style={styles.itemContent}>
                      <strong>{s.name}</strong> – {s.provider}
                    </span>
                    {s.applyLink && (
                      <button
                        onClick={() => setSelectedScholarship(s)}
                        
                        style={{ ...styles.applyLink, cursor: "pointer", border: "none" }}
                      >
                        Apply
            <button
  onClick={() => setSelectedReminder(s)}
  style={{
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "8px",
    transition: "0.3s ease",
    boxShadow: "0 2px 8px rgba(34,197,94,0.3)",
    minWidth: "95px",
  }}
  onMouseOver={(e) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow =
      "0 4px 12px rgba(34,197,94,0.4)";
  }}
  onMouseOut={(e) => {
    e.target.style.transform = "translateY(0px)";
    e.target.style.boxShadow =
      "0 2px 8px rgba(34,197,94,0.3)";
  }}
>
  🔔 Reminder
</button>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RECOMMENDED SCHOLARSHIPS */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Recommended for You</h3>
            <p style={styles.cardDescription}>
              High-match scholarships (match score ≥ 70%).
            </p>

            <div style={styles.cardList}>
              {recommended.length === 0 ? (
                <div style={styles.emptyItem}>
                  No recommendations yet.
                </div>
              ) : (
                recommended.map((s) => (
                  <div key={s._id} style={styles.listItem}>
                    <span style={styles.itemContent}>
                      <strong>{s.name}</strong> – Match {s.matchScore}%
                    </span>
                    {s.applyLink && (
                      <button
                        onClick={() => setSelectedScholarship(s)}
                        style={{ ...styles.applyLink, cursor: "pointer", border: "none" }}
                      >
                        Apply
                        <button
  onClick={() => setSelectedReminder(s)}
  style={{
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    marginLeft: "8px",
  }}
>
  Reminder
</button>
                      </button>
                      
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedScholarship && (
        <ApplyModal
          scholarship={selectedScholarship}
          applyLink={selectedScholarship.applyLink}
          onClose={() => setSelectedScholarship(null)}
        />
      )}
      {selectedReminder && (
  <ReminderModal
    scholarshipName={selectedReminder.name}
    onClose={() =>
      setSelectedReminder(null)
    }
  />
)}
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "Segoe UI, Roboto, sans-serif",
  },
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "50px 20px",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "36px",
    fontWeight: "700",
    margin: 0,
  },
  logoutBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  dashboardContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  dashboardHero: {
    textAlign: "center",
    marginBottom: "40px",
  },
  dashboardTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
  },
  dashboardSub: {
    fontSize: "16px",
    color: "#666",
    maxWidth: "600px",
    margin: "10px auto",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  cardList: {
    maxHeight: "400px",
    overflowY: "auto",
  },
listItem: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid #eee",
  gap: "12px",
},
  itemContent: {
    fontSize: "14px",
    color: "#444",
  },
  emptyItem: {
    fontSize: "14px",
    color: "#999",
    textAlign: "center",
    padding: "20px",
  },
  applyLink: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "6px 14px",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "500",
  },
};

export default Dashboard;
