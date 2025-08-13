const { useState } = React;

const PCODQuestionnaire = () => {
    // Array of 26 questions
    const questions = [
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

    // Likert scale options
    const scaleOptions = [
        { value: 1, label: "Strongly Disagree" },
        { value: 2, label: "Disagree" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Agree" },
        { value: 5, label: "Strongly Agree" }
    ];

    // State to store responses
    const [responses, setResponses] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle response change
    const handleResponseChange = (questionId, value) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: parseInt(value)
        }));
    };

    // Calculate progress
    const getProgress = () => {
        const answeredQuestions = Object.keys(responses).length;
        return (answeredQuestions / questions.length) * 100;
    };

    // Check if all questions are answered
    const isAllQuestionsAnswered = () => {
        return Object.keys(responses).length === questions.length;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isAllQuestionsAnswered()) {
            alert('Please answer all questions before submitting.');
            return;
        }

        // Log responses to console
        console.log('PCOD Questionnaire Responses:', responses);
        
        // Show thank you message
        setIsSubmitted(true);
        
        // Scroll to top to show thank you message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset questionnaire
    const resetQuestionnaire = () => {
        setResponses({});
        setIsSubmitted(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isSubmitted) {
        return (
            <div className="questionnaire-container">
                <div className="thank-you-message">
                    <h3>🎉 Thank You!</h3>
                    <p>Your responses have been successfully submitted and logged to the console.</p>
                    <p>Thank you for participating in the PCOD Behavioral Questionnaire.</p>
                    <button 
                        className="btn btn-light mt-3"
                        onClick={resetQuestionnaire}
                    >
                        Take Survey Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="questionnaire-container">
            {/* Header */}
            <div className="questionnaire-header">
                <h1>PCOD Behavioral Questionnaire</h1>
                <p>Please rate each statement based on how much you agree or disagree with it.</p>
            </div>

            {/* Progress Bar */}
            <div className="progress-text">
                Progress: {Object.keys(responses).length} of {questions.length} questions answered
            </div>
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${getProgress()}%` }}
                ></div>
            </div>

            {/* Questionnaire Form */}
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => {
                    const questionId = index + 1;
                    return (
                        <div key={questionId} className="question-card">
                            <div className="question-text">
                                <span className="question-number">{questionId}</span>
                                {question}
                            </div>
                            
                            <div className="likert-scale">
                                {scaleOptions.map((option) => (
                                    <div key={option.value} className="likert-option">
                                        <input
                                            type="radio"
                                            id={`q${questionId}_${option.value}`}
                                            name={`question_${questionId}`}
                                            value={option.value}
                                            checked={responses[questionId] === option.value}
                                            onChange={(e) => handleResponseChange(questionId, e.target.value)}
                                        />
                                        <label htmlFor={`q${questionId}_${option.value}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="scale-labels">
                                <span>1 - Strongly Disagree</span>
                                <span>5 - Strongly Agree</span>
                            </div>
                        </div>
                    );
                })}

                {/* Submit Section */}
                <div className="submit-section">
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={!isAllQuestionsAnswered()}
                    >
                        {isAllQuestionsAnswered() ? 'Submit Questionnaire' : `Answer ${questions.length - Object.keys(responses).length} more questions`}
                    </button>
                    
                    {!isAllQuestionsAnswered() && (
                        <p className="mt-3 text-muted">
                            Please answer all questions to submit the questionnaire.
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

// Render the component
ReactDOM.render(<PCODQuestionnaire />, document.getElementById('root'));
