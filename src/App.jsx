import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/QuizPage";
// import Scoreboard from "./pages/Scoreboard";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-red-100 to-purple-100">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            {/* <Route path="/scoreboard" element={<Scoreboard />} /> */}
          </Routes>
        </div>
       
      </div>
    </Router>
  );
}

export default App;
