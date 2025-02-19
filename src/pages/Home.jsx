import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center">

      {/* Hero Section */}
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to QuizMaster 🎯</h1>
        <p className="text-lg mb-6">
          Test your knowledge and challenge yourself with fun quizzes!
        </p>

        {/* Start Quiz Button */}
        <button
          className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition"
          onClick={() => navigate("/quiz")}
        >
          Start Quiz 🚀
        </button>
      </div>

      {/* Categories Section */}
      <div className="mt-12 w-3/4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Trending Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Technology",
            "Science",
            "History",
            "Math",
            "Sports",
            "Entertainment",
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white text-blue-600 p-4 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-300 transition"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm">
        Made with ❤️ by Kshitij
      </footer>
    </div>
  );
};

export default Home;
