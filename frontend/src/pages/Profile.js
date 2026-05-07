import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

const Profile = () => {
  const navigate = useNavigate(); // ✅ REQUIRED

  const [form, setForm] = useState({
    caste: "",
    income: "",
    classLevel: "",
    yearOfStudy: "",
    marks: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    api.get("/user/me").then((res) => {
      const userData = res.data;
      const p = userData.profile || {};
      setForm({
        caste: p.caste || "",
        income: p.income || "",
        classLevel: p.classLevel || "",
        yearOfStudy: p.yearOfStudy || "",
        marks: p.marks || "",
        age: p.age || "",
        gender: p.gender || "",
      });
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/user/profile", {
        ...form,
        income: Number(form.income),
        marks: Number(form.marks),
        age: Number(form.age),
      });

      alert("Profile saved successfully!");
      navigate("/dashboard"); // ✅ REDIRECT HERE
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.avatar}>
            <span style={styles.avatarText}>🎓</span>
          </div>
          <div>
            <h1 style={styles.userName}>Student Profile</h1>
            <h2 style={styles.sectionTitle}>SCHOLARSHIP PROFILE</h2>
            <p style={styles.subtitle}>
              Fill this once – we'll use it to auto-check eligibility.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Input label="Caste" name="caste" value={form.caste} onChange={handleChange} />
          <Input label="Annual Income (₹)" name="income" type="number" value={form.income} onChange={handleChange} />
          <Input label="Class / Course Level" name="classLevel" value={form.classLevel} onChange={handleChange} />
          <Input label="Year of Study" name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange} />
          <Input label="Previous Year Marks (%)" name="marks" type="number" value={form.marks} onChange={handleChange} />
          <Input label="Age" name="age" type="number" value={form.age} onChange={handleChange} />

          {/* Gender */}
          <div style={styles.formSection}>
            <label style={styles.label}>Gender</label>
            <div style={styles.genderOptions}>
              {["Male", "Female", "Other"].map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={handleChange}
                  />{" "}
                  {g}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={styles.saveButton}>
            SAVE PROFILE
          </button>
        </form>
      </div>
    </div>
  );
};

/* Small reusable input */
const Input = ({ label, ...props }) => (
  <div style={styles.formSection}>
    <label style={styles.label}>{label}</label>
    <input style={styles.input} {...props} required />
  </div>
);

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
  },
  container: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  avatar: {
    background: "#4f46e5",
    color: "white",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
  },
  userName: { margin: 0 },
  sectionTitle: { color: "#4f46e5", margin: "5px 0" },
  subtitle: { color: "#666" },
  formSection: { marginBottom: "20px" },
  label: { fontWeight: "600", display: "block", marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  genderOptions: { display: "flex", gap: "20px" },
  saveButton: {
    width: "100%",
    padding: "15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Profile;
