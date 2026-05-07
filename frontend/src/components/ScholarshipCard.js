import React, { useState } from "react";
import ApplyModal from "./ApplyModal";

const ScholarshipCard = ({ scholarship }) => {
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

  const casteText = Array.isArray(caste) ? caste.join(", ") : caste;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">{name}</div>
          {provider && <div className="card-provider">{provider}</div>}
          <div className="badges">
            {sector && <span className="badge">{sector}</span>}
            {eligible && <span className="badge badge-green">Eligible</span>}
            {!eligible && (
              <span className="badge badge-yellow">Check criteria</span>
            )}
            {typeof matchScore === "number" && (
              <span className="badge">
                Match&nbsp;Score: {matchScore}%
              </span>
            )}
          </div>
        </div>
      </div>

      {description && (
        <div className="card-body">
          {description.length > 130
            ? description.slice(0, 130) + "..."
            : description}
        </div>
      )}

      <div className="card-footer">
        <div className="text-muted">
          {casteText && <div>Caste: {casteText}</div>}
          {minIncome && <div>Max income: ₹{minIncome.toLocaleString()}</div>}
          {minMarks && <div>Min marks: {minMarks}%</div>}
        </div>
        {applyLink && (
          <button
            className="card-link-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Apply
          </button>
        )}
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scholarshipName={name}
        applyLink={applyLink}
        onOfflineClick={() => {
          // Placeholder for offline click functionality
          console.log("Offline apply clicked");
        }}
      />
    </div>
  );
};

export default ScholarshipCard;
