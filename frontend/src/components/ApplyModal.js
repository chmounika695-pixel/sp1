import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";

const ApplyModal = ({
  scholarship,
  applyLink,
  onClose,
}) => {
  const [showOffline, setShowOffline] = useState(false);
  const [city, setCity] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Online Apply
  const handleOnlineApply = () => {

    const link =
      applyLink ||
      scholarship?.applyLink ||
      scholarship?.link ||
      scholarship?.url;

    if (!link) {
      alert("Application link not available");
      return;
    }

    window.open(link, "_blank");
  };

  // Offline Apply
  const handleOfflineApply = () => {
    setShowOffline(true);
  };

  const fetchCenters = async () => {
    try {
      setLoading(true);
      setSearched(true);
      const res = await api.get(`/centers${city ? `?city=${city}` : ""}`);
      setCenters(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch centers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          width: "420px",
          maxWidth: "90%",
          borderRadius: "18px",
          padding: "28px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "16px",
            border: "none",
            background: "transparent",
            fontSize: "22px",
            cursor: "pointer",
            color: "#555",
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Apply for Scholarship
        </h2>

        {!showOffline ? (
          <>
            {/* Subtitle */}
            <p
              style={{
                color: "#666",
                marginBottom: "24px",
              }}
            >
              Choose how you would like to apply.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <button
                onClick={handleOnlineApply}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Apply Online
              </button>

              <button
                onClick={handleOfflineApply}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Apply Offline
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Find an offline center near you.
            </p>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Search by city (e.g. Bangalore)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px"
                }}
              />
              <button
                onClick={fetchCenters}
                style={{
                  background: "#8b5cf6",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Search
              </button>
            </div>
            
            <div style={{ maxHeight: "300px", overflowY: "auto", textAlign: "left" }}>
              {loading ? (
                <p style={{ textAlign: "center", color: "#666" }}>Loading centers...</p>
              ) : searched && centers.length === 0 ? (
                <p style={{ textAlign: "center", color: "#666" }}>No centers found.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {centers.map(center => (
                    <div key={center._id} style={{ border: "1px solid #eee", padding: "16px", borderRadius: "10px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "4px" }}>{center.name}</div>
                      <div style={{ fontSize: "14px", color: "#555", marginBottom: "4px" }}>{center.address}, {center.city}</div>
                      <div style={{ fontSize: "14px", color: "#000" }}>📞 {center.contactPhone}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;