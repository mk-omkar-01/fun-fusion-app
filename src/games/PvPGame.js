import React, { useState, useCallback } from 'react';
import './styles/PvPGame.css';  
import trophyIcon from '../images/throphy.png'; // Ensure this path is correct

function PvPGame() {
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const [gameStarted, setGameStarted] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleStartGame = () => {
    if (players.player1 && players.player2) {
      setGameStarted(true);
      setGameStatus(`Current player: ${players.player1}`);
      setSquares(Array(9).fill(null));
      setIsXNext(true);
      setWinner(null);
      setIsDraw(false);
    } else {
      alert('Please enter names for both players.');
    }
  };

  const handlePlayerChange = (e) => {
    const { name, value } = e.target;
    setPlayers(prevPlayers => ({ ...prevPlayers, [name]: value }));
  };

  const handleClick = useCallback((index) => {
    const squaresCopy = [...squares];
    if (winner || squaresCopy[index] || isDraw) return;

    squaresCopy[index] = isXNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setIsXNext(!isXNext);

    const calculatedWinner = calculateWinner(squaresCopy);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      setGameStatus(`Congratulations ${calculatedWinner === 'X' ? players.player1 : players.player2} for winning the game!`);
    } else if (!squaresCopy.includes(null)) {
      setGameStatus("It's a draw!");
      setIsDraw(true);
    } else {
      setGameStatus(`Current player: ${isXNext ? players.player2 : players.player1}`);
    }
  }, [squares, isXNext, winner, players, isDraw]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus(null);
    setGameStarted(false);
    setWinner(null);
    setIsDraw(false);
  };

  const handleReplay = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus(`Current player: ${players.player1}`);
    setWinner(null);
    setIsDraw(false);
  };

  const isPlayNowActive = players.player1 && players.player2;
  const isRestartReplayActive = winner || isDraw;

  if (!gameStarted) {
    return (
      <div className="pvp-background">
      <div className="setup">
        <h1 className="game-heading">XOX Game</h1>
        <div className="player-inputs">
          <input
            type="text"
            name="player1"
            placeholder="Player 1 Name"
            value={players.player1}
            onChange={handlePlayerChange}
          />
          <input
            type="text"
            name="player2"
            placeholder="Player 2 Name"
            value={players.player2}
            onChange={handlePlayerChange}
          />
        </div>
        <button onClick={handleStartGame} className={isPlayNowActive ? 'active' : ''}>
          Start Playing
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="pvp-background">
    <div className="game">
      <h1 className="game-heading">XOX Game</h1>
      <div className="game-status">
        {winner ? (
          <div className="winner-section">
            <div className="winner-message">
              <p>{gameStatus}</p>
            </div>
            <div className="trophy-container">
              <img src={trophyIcon} alt="Trophy" className="trophy-img" />
              <button onClick={handleRestart} className={`restart-button ${isRestartReplayActive ? 'active' : ''}`}>
                Restart
              </button>
            </div>
          </div>
        ) : (
          <div className="game-status-message">
            <div className="status">{gameStatus}</div><br/>
            {isDraw && (
              <div className="draw-replay">
                <button onClick={handleReplay} className={`replay-button ${isRestartReplayActive ? 'active' : ''}`}>
                  Replay
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {!winner && (
        <div className="game-board">
          {squares.map((square, index) => (
            <button
              key={index}
              className={`square ${square}`}
              onClick={() => handleClick(index)}
            >
              {square}
            </button>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default PvPGame;
