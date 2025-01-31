import { useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to the Quiz!</h1>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
      <br />
      <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
    </div>
  );
};

export default Home;