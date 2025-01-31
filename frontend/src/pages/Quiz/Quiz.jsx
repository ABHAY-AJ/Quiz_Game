import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import QuizSummary from "../../components/QuizSummary/QuizSummary";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import api from "../../api/api";
import { useSpring, animated } from "react-spring"; // For animations
import "./Quiz.css";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [streak, setStreak] = useState(0); // Track current streak
  const [highestStreak, setHighestStreak] = useState(0); // Track the highest streak achieved
  const [timer, setTimer] = useState(15); // Timer for each question

  // Calculate progress as a number (0 to 100)
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  // Animation for the character
  const characterAnimation = useSpring({
    left: progress, // Use a number instead of a string
    config: { tension: 120, friction: 14 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/quiz");
        if (response.data && response.data.questions && Array.isArray(response.data.questions)) {
          setQuizData(response.data.questions);
        } else {
          console.error("Invalid quiz data format: No questions found", response.data);
          setQuizData([]);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchData();
  }, []);

  // Timer logic
  useEffect(() => {
    if (quizData.length === 0 || showSummary) return; // Don't start the timer if no questions or quiz is over

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          // Time's up! Move to the next question
          handleAnswer(false, null); // Pass `false` for incorrect answer and `null` for no selected option
          return 15; // Reset timer for the next question
        }
        return prevTimer - 1;
      });
    }, 1000); // Update timer every second

    return () => clearInterval(timerInterval); // Cleanup interval on unmount or question change
  }, [currentQuestion, quizData, showSummary]);

  const handleAnswer = (isCorrect, selectedOption) => {
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1); // Increase streak

      // Update the highest streak if the current streak exceeds it
      if (streak + 1 > highestStreak) {
        setHighestStreak(streak + 1);
      }
    } else {
      setStreak(0); // Reset streak on wrong answer
    }

    // Store user-selected answer
    setUserAnswers([
      ...userAnswers,
      {
        question: quizData[currentQuestion].description,
        options: quizData[currentQuestion].options,
        selectedOption: selectedOption,
        correctOption: quizData[currentQuestion].options.find((option) => option.is_correct),
      },
    ]);

    // Reset timer for the next question
    setTimer(15);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleSaveScore = async (name) => {
    try {
      await api.post("/scores/save", { name, score });
      setShowLeaderboard(true);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  if (showLeaderboard) return <Leaderboard />;
  if (showSummary)
    return (
      <QuizSummary
        score={score}
        totalQuestions={quizData.length}
        userAnswers={userAnswers}
        onSave={handleSaveScore}
        highestStreak={highestStreak} // Pass the highest streak
      />
    );
  if (quizData.length === 0) return <div>Loading...</div>;

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h2>Question {currentQuestion + 1} of {quizData.length}</h2>
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Animated Cartoon Character */}
          <animated.div
            className="character"
            style={{
              left: characterAnimation.left.to((x) => `${x}%`), // Convert number to percentage string
              position: "absolute",
              bottom: "0",
              transform: "translateX(-50%)",
            }}
          >
            🏃‍♀️‍➡️
          </animated.div>
        </div>
        <div className="streak">🔥 Streak: {streak}</div>
        {/* Display the badge if the current streak is 3 or more */}
        {streak >= 3 && (
          <div className="badge">
            🏆 {streak}-in-a-row
          </div>
        )}
        {/* Timer Display */}
        <div className="timer">
          ⏳ Time Left: {timer}s
        </div>
      </div>
      <QuizQuestion
        question={quizData[currentQuestion].description}
        options={quizData[currentQuestion].options}
        onAnswer={(isCorrect, selectedOption) => handleAnswer(isCorrect, selectedOption)}
      />

      <div className="score-display">
        <span>Score: {score}</span>
      </div>
    </div>
  );
};

export default Quiz;