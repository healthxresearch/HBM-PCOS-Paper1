const { useState } = React;

const Welcome = () => {
  const [consent, setConsent] = useState(false);

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Welcome to the PCOS Wellness Survey</h1>
      </div>

      <div className="welcome-body">
        <p>
          This quick 10-minute questionnaire is part of a research study exploring how women perceive and use mobile health (mHealth) apps for managing PCOS (Polycystic Ovary Syndrome).
        </p>

        <div className="info-box">
          mHealth apps are mobile applications that help individuals track, manage, and improve their health through smartphones or tablets.
        </div>

        <div className="bullet-section">
          <p><strong>Your answers will help us:</strong></p>
          <ul>
            <li>Understand what makes health apps useful (or not) for women like you</li>
            <li>Design better tools to support PCOS management</li>
            <li>Empower women with personalized, tech-enabled care</li>
          </ul>
        </div>

        <div className="disclaimer-box">
          This is not a diagnostic test, and all responses are confidential and anonymous.
        </div>

        <div className="checkbox-section">
          <label>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            I consent to participate in this voluntary research study
          </label>
        </div>

        <button
          className="start-btn"
          onClick={() => {
            if (consent) {
              alert("Survey will start now (redirect or load next screen)");
              // You can call your questionnaire render function here
            } else {
              alert("Please give your consent to proceed.");
            }
          }}
        >
          START SURVEY
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<Welcome />, document.getElementById("root"));
