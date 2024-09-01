import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quiz from './games/Quiz';
import LandingPage from './components/LandingPage';
import PvPGame from './games/PvPGame';
import GuessTheLocation from './games/GuessTheLocation';
import MovieQuiz from './games/MovieQuiz';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie" element={<MovieQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/pvp" element={<PvPGame />} />
          <Route path="/location" element={<GuessTheLocation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
