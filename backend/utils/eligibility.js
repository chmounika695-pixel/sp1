// backend/utils/eligibility.js

function normalizeCaste(casteField) {
  if (!casteField) return [];
  if (Array.isArray(casteField)) return casteField;
  return [String(casteField)];
}

function checkEligibility(userProfile, scholarship) {
  if (!userProfile) return false;

  const {
    caste,
    income,
    classLevel,
    yearOfStudy,
    marks,
    age,
    gender,
  } = userProfile;

  const casteList = normalizeCaste(scholarship.caste);

  const casteOk =
    casteList.length === 0 || !caste || casteList.includes(caste);

  const incomeOk =
    !scholarship.minIncome || (income != null && income <= scholarship.minIncome);

  const marksOk =
    !scholarship.minMarks || (marks != null && marks >= scholarship.minMarks);

  const genderOk =
    !scholarship.gender ||
    scholarship.gender === "Any" ||
    !gender ||
    scholarship.gender.toLowerCase() === String(gender).toLowerCase();

  const ageOk =
    !scholarship.maxAge || (age != null && age <= scholarship.maxAge);

  const classOk =
    !scholarship.classLevel ||
    !classLevel ||
    scholarship.classLevel === "Any" ||
    scholarship.classLevel === classLevel;

  const yearOk =
    !scholarship.yearOfStudy ||
    !yearOfStudy ||
    scholarship.yearOfStudy === "Any" ||
    scholarship.yearOfStudy === yearOfStudy;

  return casteOk && incomeOk && marksOk && genderOk && ageOk && classOk && yearOk;
}

function matchScore(userProfile, scholarship) {
  if (!userProfile) return 0;

  let total = 7;
  let score = 0;

  const {
    caste,
    income,
    classLevel,
    yearOfStudy,
    marks,
    age,
    gender,
  } = userProfile;

  const casteList = normalizeCaste(scholarship.caste);

  if (casteList.length === 0 || !caste || casteList.includes(caste)) score++;
  if (!scholarship.minIncome || income <= scholarship.minIncome) score++;
  if (!scholarship.minMarks || marks >= scholarship.minMarks) score++;
  if (
    !scholarship.gender ||
    scholarship.gender === "Any" ||
    !gender ||
    scholarship.gender.toLowerCase() === String(gender).toLowerCase()
  )
    score++;
  if (!scholarship.maxAge || age <= scholarship.maxAge) score++;
  if (!scholarship.classLevel || scholarship.classLevel === classLevel) score++;
  if (!scholarship.yearOfStudy || scholarship.yearOfStudy === yearOfStudy)
    score++;

  return Math.round((score / total) * 100);
}

module.exports = { checkEligibility, matchScore };
