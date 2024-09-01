import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quiz from './games/Quiz';
import LandingPage from './components/LandingPage';
import PvPGame from './games/PvPGame';
import GamesPage from './components/GamesPage';
import GuessTheLocation from './games/GuessTheLocation';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/pvp" element={<PvPGame />} />
          <Route path="/location" element={<GuessTheLocation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
