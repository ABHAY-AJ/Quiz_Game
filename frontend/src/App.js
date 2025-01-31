import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Quiz from "./pages/Quiz/Quiz";
import "./App.css"

function App() {
  return (
    <div className="main">

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;