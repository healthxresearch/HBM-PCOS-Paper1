import React from 'react';
import './styles.css'; // Ensure this file has the updated theme CSS

const [confidentialityConsent, setConfidentialityConsent] = useState(false);
const Welcome = ({ onStart }) => {
  return (
    <div className="welcome-container fade-in">
      {/* Header Section */}
      <div className="welcome-header">
        <h1>Welcome to the PCOS Wellness Survey</h1>
        <p className="subtitle">Empowering women through personalised health insights</p>
      </div>

      {/* Intro Section */}
      <div className="welcome-content">
        <section className="welcome-intro">
          <p>
            This brief 10-minute survey aims to understand your health perceptions and readiness to use mobile apps for managing PCOS. Your responses will help design better, evidence-based health tools tailored for Indian women.
          </p>
        </section>

        {/* What is mHealth Section */}
        <section className="welcome-definition">
          <strong>What are mHealth apps?</strong><br />
          Mobile health (mHealth) apps are digital tools that help individuals monitor and manage their health using smartphones.
        </section>

        {/* Why this matters */}
        <section className="welcome-benefits">
          <p>Your answers will help us:</p>
          <ul>
            <li>Understand what makes health apps useful (or not) for women like you</li>
            <li>Design better tools to support PCOS management</li>
            <li>Empower women with personalized, tech-enabled care</li>
          </ul>
        </section>

        {/* Consent Disclaimer */}
        <section className="welcome-disclaimer">
          Your responses will remain confidential and will be used strictly for academic research purposes.
        </section>
         
         <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="confidentialityConsent"
              checked={confidentialityConsent}
              onChange={(e) => setConfidentialityConsent(e.target.checked)}
            />
             <label htmlFor="confidentialityConsent">
                I understand this is not a diagnostic test and my responses will remain confidential and anonymous.
            </label>
          </div>

        {/* Start Button */}
        <div className="start-button-section">
          <button
            className="start-survey-btn"
            onClick={onStart}
          >
            Start Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
