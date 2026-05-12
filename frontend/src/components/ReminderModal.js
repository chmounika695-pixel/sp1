import React from "react";

const ReminderModal = ({ scholarshipName, onClose }) => {
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
                    background: "white",
                    width: "400px",
                    maxWidth: "90%",
                    borderRadius: "16px",
                    padding: "24px",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "15px",
                        border: "none",
                        background: "transparent",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                >
                    ✕
                </button>

                <h2 style={{ textAlign: "center" }}>
                    Set Reminder
                </h2>

                <p style={{ textAlign: "center" }}>
                    Scholarship:
                </p>

                <h3 style={{ textAlign: "center" }}>
                    {scholarshipName}
                </h3>

                <p style={{ textAlign: "center", color: "#666" }}>
                    Reminder feature coming next
                </p>
            </div>
        </div>
    );
};

export default ReminderModal;