import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

import card1 from './xox.jpg'; // Adjust the path based on your file structure
import card2 from './quiz.avif';
import card3 from './location.jpg';
import card4 from './song.png';

const games = [
    { image: card1, name: 'XOX Game', description: 'A fun and strategic game for two players.', link: '/pvp' },
    { image: card2, name: 'Quiz Game', description: 'Test your knowledge with various trivia questions.', link: '/quiz' },
    { image: card3, name: 'Location Game', description: 'Explore and guess different locations.', link: '/location' },
    { image: card4, name: 'Song Game', description: 'Guess the song from the given clues.', link: '/song' },
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
                    <Link to={game.link} className="play-button">
                        Play Now
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default LandingPage;
