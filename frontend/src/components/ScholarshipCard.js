import React, { useState } from "react";
import ApplyModal from "./ApplyModal";
import ReminderModal from "./ReminderModal";

const ScholarshipCard = ({ scholarship }) => {

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] =
    useState(false);

  if (!scholarship) return null;

  const {
    name,
    provider,
    sector,
    description,
    applyLink,
    eligible,
    matchScore,
    caste,
    minIncome,
    minMarks,
  } = scholarship;

  const casteText = Array.isArray(caste)
    ? caste.join(", ")
    : caste;

  return (
    <div className="card">

      {/* Header */}
      <div className="card-header">
        <div>
          <div className="card-title">
            {name}
          </div>

          {provider && (
            <div className="card-provider">
              {provider}
            </div>
          )}

          <div className="badges">
            {sector && (
              <span className="badge">
                {sector}
              </span>
            )}

            {eligible ? (
              <span className="badge badge-green">
                Eligible
              </span>
            ) : (
              <span className="badge badge-yellow">
                Check criteria
              </span>
            )}

            {typeof matchScore === "number" && (
              <span className="badge">
                Match Score: {matchScore}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="card-body">
          {description.length > 130
            ? description.slice(0, 130) + "..."
            : description}
        </div>
      )}

      {/* Footer */}
      <div className="card-footer">
        <h3 style={{ color: "red" }}>
          TEST BUTTON
        </h3>
        <div className="text-muted">
          {casteText && (
            <div>
              Caste: {casteText}
            </div>
          )}

          {minIncome && (
            <div>
              Max income: ₹
              {minIncome.toLocaleString()}
            </div>
          )}

          {minMarks && (
            <div>
              Min marks: {minMarks}%
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "10px",
            width: "100%",
          }}
        >
          {/* Apply Button */}
          {applyLink && (
            <button
              className="card-link-btn"
              onClick={() => setIsModalOpen(true)}
              style={{ width: "100%" }}
            >
              Apply
            </button>
          )}

          {/* Reminder Button */}
          <button
            className="card-link-btn"
            onClick={() => setIsReminderOpen(true)}
            style={{
              width: "100%",
              backgroundColor: "#16a34a",
              color: "white",
            }}
          >
            Set Reminder
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {isModalOpen && (
        <ApplyModal
          scholarship={scholarship}
          applyLink={applyLink}
          onClose={() =>
            setIsModalOpen(false)
          }
        />
      )}

      {/* Reminder Modal */}
      {isReminderOpen && (
        <ReminderModal
          scholarshipName={name}
          onClose={() =>
            setIsReminderOpen(false)
          }
        />
      )}
    </div>
  );
};

export default ScholarshipCard;