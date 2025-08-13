// questionnaire.js
import React, { useState } from 'react';
import './styles.css';

const sections = [
  {
    title: "Section A: About You",
    questions: [
      { id: "age", text: "What is your age?", type: "number", placeholder: "Enter your age" },
      { id: "maritalStatus", text: "Marital Status", type: "select", options: ["Single", "Married", "Other"] },
      { id: "education", text: "Education Level", type: "select", options: ["High School", "Bachelor's", "Master's", "PhD"] },
      { id: "employment", text: "Employment Status", type: "select", options: ["Employed", "Unemployed", "Student", "Other"] }
    ]
  },
  {
    title: "Section B: Health Details",
    questions: [
      { id: "height", text: "Your height (in cm)", type: "number", placeholder: "Enter your height" },
      { id: "weight", text: "Your weight (in kg)", type: "number", placeholder: "Enter your weight" },
      { id: "pcosDiagnosed", text: "Have you been diagnosed with PCOS?", type: "select", options: ["Yes", "No", "Not Sure"] },
      { id: "menstrualCycle", text: "Is your menstrual cycle regular?", type: "select", options: ["Yes", "No", "Sometimes"] }
    ]
  }
];

const Questionnaire = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pcosDiagnosis, setPcosDiagnosis] = useState(null);

  const handleChange = (id, value) => {
    setResponses(prev => ({
      ...prev,
      [id]: value
    }));
    if (id === "pcosDiagnosed") setPcosDiagnosis(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Responses:", responses);
    setIsSubmitted(true);
  };

  const current = sections[currentSection];

  if (isSubmitted) {
    return (
      <div className="questionnaire-card fade-in">
        <h3>🎉 Thank You!</h3>
        <p>Your responses have been submitted successfully.</p>
        <button className="start-btn" onClick={() => window.location.reload()}>
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="questionnaire-card fade-in">
      <h2 className="section-title">{current.title}</h2>
      <form onSubmit={handleSubmit}>
        {current.questions.map((q) => {
          if (q.id === "menstrualCycle" && pcosDiagnosis !== "Yes") return null;

          return (
            <div key={q.id} className="form-group">
              <label htmlFor={q.id}>{q.text}</label>
              {q.type === "text" || q.type === "number" ? (
                <input
                  type={q.type}
                  id={q.id}
                  value={responses[q.id] || ""}
                  placeholder={q.placeholder || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ) : (
                <select
                  id={q.id}
                  value={responses[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {q.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          );
        })}

        <div className="navigation-buttons">
          {currentSection > 0 && (
            <button
              type="button"
              className="nav-btn"
              onClick={() => setCurrentSection(prev => prev - 1)}
            >
              Back
            </button>
          )}
          {currentSection < sections.length - 1 ? (
            <button
              type="button"
              className="nav-btn"
              onClick={() => setCurrentSection(prev => prev + 1)}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="start-btn">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
