import React, { useState } from "react";
import "./QuizQuestion.css";

const QuizQuestion = ({ question, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Ensure the question ends with a question mark
  const formattedQuestion = question.trim().endsWith("?") ? question : `${question}?`;

  const handleClick = (isCorrect, option) => {
    setSelectedOption(option);
    setTimeout(() => {
      onAnswer(isCorrect, option);
      setSelectedOption(null);
    }, 500); // Delay to show feedback before moving to the next question
  };

  return (
    <div className="quiz-question">
      <h3>{formattedQuestion}</h3>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleClick(option.is_correct, option)}
            className={
              selectedOption === option
                ? option.is_correct
                  ? "correct"
                  : "incorrect"
                : ""
            }
          >
            {option.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;