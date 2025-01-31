import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get("/scores/leaderboard");
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <>
    <div className="leaderboard">
      <h2>Leaderboard</h2>
    </div>
     <div className="leaderboard">
    
      {scores.length > 0 ? (
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              <span className="rank">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
              </span>
              <span className="name">{score.name}</span>
              <span className="score">{score.score} points</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    
   
   </div>
   </>
  );
};

export default Leaderboard;