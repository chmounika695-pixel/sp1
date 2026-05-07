import React from "react";
import { useParams } from "react-router-dom";

const ScholarshipDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Scholarship Details</h2>
      <p>Scholarship ID: {id}</p>
      <p>
        This page will show detailed information about the selected scholarship.
      </p>
    </div>
  );
};

export default ScholarshipDetails;
