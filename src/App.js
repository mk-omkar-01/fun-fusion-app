import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quiz from './games/Quiz';
import LandingPage from './components/LandingPage';
import PvPGame from './games/PvPGame';
import GuessTheLocation from './games/GuessTheLocation';
import MovieQuiz from './games/MovieQuiz';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie" element={<MovieQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/pvp" element={<PvPGame />} />
          <Route path="/location" element={<GuessTheLocation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
