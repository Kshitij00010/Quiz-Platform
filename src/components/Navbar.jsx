import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className={`p-4 shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          QuizMaster
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-500">Home</Link>
          </li>
          <li>
            <Link to="/quiz" className="hover:text-blue-500">Quiz</Link>
          </li>
          <li>
            <Link to="/scoreboard" className="hover:text-blue-500">Scoreboard</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500">About</Link>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
        </button>
      </div>
    </nav>
  );
}
