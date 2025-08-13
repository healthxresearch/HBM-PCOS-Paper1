import React, { useState } from 'react';
import './styles.css';

const PCODQuestionnaire = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [responses, setResponses] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [pcosDiagnosis, setPcosDiagnosis] = useState(null);

    const hbmQuestions = [
        "I believe I am at risk of developing PCOD.",
        "My lifestyle may increase my chances of getting PCOD.",
        "PCOD can lead to serious long-term health problems.",
        "Living with untreated PCOD can affect my quality of life.",
        "Improving my lifestyle can reduce my chances of PCOD.",
        "Using a health app can help me manage PCOD better.",
        "It is difficult for me to make healthy lifestyle changes.",
        "I don't have enough time or motivation to manage my health.",
        "I pay attention to reminders or suggestions about healthy living.",
        "I often come across content related to PCOD or health online.",
        "I am confident I can make changes in my diet and lifestyle.",
        "Even if it's hard, I believe I can improve my health habits.",
        "I am not currently thinking about changing my health habits.",
        "I am considering making changes to my lifestyle soon.",
        "I have started making small changes in my health habits.",
        "I have recently started practicing healthier habits.",
        "I have been maintaining a healthy lifestyle for a while.",
        "I actively seek information about PCOD and health.",
        "I feel emotional when I think about health risks like PCOD.",
        "I believe improving my health sets a good example for others.",
        "I think about how living healthy reflects who I want to be.",
        "I believe I have the power to choose a healthier lifestyle.",
        "I get support from friends or family in maintaining health.",
        "I reward myself when I follow through with health goals.",
        "I try to avoid things in my environment that trigger unhealthy behavior.",
        "I feel inspired by public figures or movements promoting women's health."
    ];

    const scaleOptions = [
        { value: 1, label: "Strongly Disagree" },
        { value: 2, label: "Disagree" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Agree" },
        { value: 5, label: "Strongly Agree" }
    ];

    const sections = [
        {
            title: "About You",
            questions: [
                { id: "age", text: "What is your age?", type: "number" },
                { id: "education", text: "What is your highest education level?", type: "text" },
                { id: "maritalStatus", text: "Marital Status", type: "select", options: ["Single", "Married", "Other"] },
                { id: "location", text: "Which city/state do you live in?", type: "text" },
            ]
        },
        {
            title: "Health Details",
            questions: [
                { id: "height", text: "Your height (in cm)", type: "number" },
                { id: "weight", text: "Your weight (in kg)", type: "number" },
                { id: "pcosDiagnosed", text: "Have you been diagnosed with PCOS?", type: "select", options: ["Yes", "No", "Not Sure"] },
                { id: "menstrualCycle", text: "Is your menstrual cycle regular?", type: "select", options: ["Yes", "No", "Sometimes"] },
            ]
        },
        {
            title: "Daily Habits",
            questions: [
                { id: "exercise", text: "How many days a week do you exercise?", type: "number" },
                { id: "diet", text: "How would you describe your diet?", type: "select", options: ["Healthy", "Moderate", "Unhealthy"] },
                { id: "screenTime", text: "Average screen time per day (in hours)", type: "number" },
                { id: "sleep", text: "Average sleep per night (in hours)", type: "number" },
            ]
        },
        {
            title: "Beliefs & Perceptions",
            questions: hbmQuestions.map((text, i) => ({
                id: `hbm_q${i + 1}`,
                text,
                type: "likert"
            }))
        }
    ];

    const handleResponseChange = (questionId, value) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }));

        if (questionId === "pcosDiagnosed") {
            setPcosDiagnosis(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Survey Responses:", responses);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToNextSection = () => setCurrentSection(prev => prev + 1);
    const goToPreviousSection = () => setCurrentSection(prev => prev - 1);

    const current = sections[currentSection];

    if (isSubmitted) {
        return (
            <div className="questionnaire-container fade-in">
                <div className="thank-you-message">
                    <h3>🎉 Thank You!</h3>
                    <p>Your responses have been successfully submitted and logged to the console.</p>
                    <button className="btn btn-light mt-3" onClick={() => window.location.reload()}>
                        Take Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="questionnaire-container fade-in">
            <h2>{current.title}</h2>
            <form onSubmit={handleSubmit}>
                {current.questions.map(q => {
                    if (q.id === "menstrualCycle" && pcosDiagnosis !== "Yes") {
                        return null;
                    }

                    return (
                        <div key={q.id} className="question-card">
                            <label>{q.text}</label>
                            {q.type === "text" || q.type === "number" ? (
                                <input
                                    type={q.type}
                                    value={responses[q.id] || ""}
                                    onChange={(e) => handleResponseChange(q.id, e.target.value)}
                                />
                            ) : q.type === "select" ? (
                                <select
                                    value={responses[q.id] || ""}
                                    onChange={(e) => handleResponseChange(q.id, e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {q.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : q.type === "likert" ? (
                                <div className="likert-scale">
                                    {scaleOptions.map(opt => (
                                        <label key={opt.value}>
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={opt.value}
                                                checked={responses[q.id] === String(opt.value)}
                                                onChange={(e) => handleResponseChange(q.id, e.target.value)}
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    );
                })}

                <div className="navigation-buttons">
                    {currentSection > 0 && (
                        <button type="button" onClick={goToPreviousSection}>Back</button>
                    )}
                    {currentSection < sections.length - 1 ? (
                        <button type="button" onClick={goToNextSection}>Next</button>
                    ) : (
                        <button type="submit">Submit</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PCODQuestionnaire;
