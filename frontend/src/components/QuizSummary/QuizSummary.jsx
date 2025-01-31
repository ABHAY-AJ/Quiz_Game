import { useState, useEffect } from "react";
import Confetti from "react-confetti"; // For celebration effect
import { toast, ToastContainer } from "react-toastify"; // For toast messages
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import "./QuizSummary.css";

const QuizSummary = ({ score, totalQuestions, userAnswers, onSave, highestStreak }) => {
  const [name, setName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false); // Control confetti display

  useEffect(() => {
    // Show confetti if the user scored more than 70%
    if (score / totalQuestions >= 0.7) {
      setShowConfetti(true);
      toast.success("🎉 Congratulations! You did an amazing job!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("😢 Better luck next time! Keep practicing!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [score, totalQuestions]);

  return (
    <div className="quiz-summary">
      {/* Confetti effect */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Toast container for messages */}
      <ToastContainer />

      <h2>Quiz Completed!</h2>
      <p>
        Your Score: {score} / {totalQuestions}
      </p>
      {/* Display the badge if the highest streak was 3 or more */}
      {highestStreak >= 3 && (
        <div className="badge-earned">
          <h3>🏆 Highest Streak:</h3>
          <span className="badge">{highestStreak}-in-a-row</span>
        </div>
      )}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="save-button" onClick={() => onSave(name)}>
        Save Score
      </button>
      <div className="quiz-review">
        {userAnswers.map((answer, index) => (
          <div key={index} className="question-summary">
            <h3>
              {index + 1}. {answer.question}
            </h3>
            <ul>
              {answer.options.map((option, i) => (
                <li
                  key={i}
                  style={{
                    backgroundColor: option.is_correct
                      ? "green"
                      : option === answer.selectedOption
                      ? "red"
                      : "transparent",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {option.description}{" "}
                  {option === answer.selectedOption ? "(Your Answer)" : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSummary;