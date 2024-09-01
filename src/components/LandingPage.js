import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

import card1 from './images/xox.jpg'; // Adjust the path based on your file structure
import card2 from './images/quiz.avif';
import card3 from './location.jpg';
import card4 from '../images/movie.jpg';
import card5 from './images/puzzle.webp';
import card6 from './images/word.png';
import card7 from './images/memory.jpg'; // Placeholder image for Coming Soon cards

const games = [
    { image: card1, name: 'XOX Game', description: 'A fun and strategic game for two players.', link: '/pvp' },
    { image: card2, name: 'Quiz Game', description: 'Test your knowledge with various trivia questions.', link: '/quiz' },
    { image: card3, name: 'Location Game', description: 'Explore and guess different locations.', link: '/location' },
    { image: card4, name: 'Movie Game', description: 'Guess the Movie from the given clues.', link: '/movie' },
    { image: card5, name: 'Puzzle Game', description: 'Challenge yourself with brain-teasing puzzles. Coming Soon!', link: null },
    { image: card6, name: 'Word Game', description: 'Test your vocabulary with word challenges. Coming Soon!', link: null },
    { image: card7, name: 'Memory Game', description: 'Sharpen your memory skills with this game. Coming Soon!', link: null },
];

const LandingPage = () => {
    return (
        <div className="grid-container">
            {games.map((game, index) => (
                <div key={index} className="card">
                    <img
                        src={game.image}
                        alt={`Card ${index + 1}`}
                        className="card-image"
                    />
                    <div className="card-info">
                        <h3 className="game-name">{game.name}</h3>
                        <p className="game-description">{game.description}</p>
                    </div>
                    {game.link ? (
                        <Link to={game.link} className="play-button">
                            Play Now
                        </Link>
                    ) : (
                        <div className="coming-soon-button">Coming Soon</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LandingPage;
