import React, { useState, useEffect, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './styles/Location.css';
import startImage from '../components/location.jpg';  // Import your local image

const locations = [
  // Karnataka Locations
  { name: 'Mysore Palace', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAjPXJa5LD3IhnOKG_rA2HTZzYUUZLmHTSw&s', options: ['Mysore Palace', 'Hampi', 'Badami', 'Chitradurga Fort', 'Bangalore Palace'] },
  { name: 'Hampi', image: 'https://media.easemytrip.com/media/Blog/India/637925291200301189/637925291200301189sxgzqv.jpg', options: ['Mysore Palace', 'Hampi', 'Badami', 'Chitradurga Fort', 'Bangalore Palace'] },
  { name: 'Badami', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZX70fXWmjKVpaAvuHVbjeJjfrv_NlF9_hQ&s', options: ['Mysore Palace', 'Hampi', 'Badami', 'Chitradurga Fort', 'Bangalore Palace'] },
  { name: 'Chitradurga Fort', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJA4WeBdgRpruuVfLTTs3ISotrmufebaCE5g&s', options: ['Mysore Palace', 'Hampi', 'Badami', 'Chitradurga Fort', 'Bangalore Palace'] },
  { name: 'Bangalore Palace', image: 'https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Bangalore-Palace_600.jpg', options: ['Mysore Palace', 'Hampi', 'Badami', 'Chitradurga Fort', 'Bangalore Palace'] },
  { name: 'Coorg', image: 'https://www.welcomheritagehotels.in/app/uploaded_files/hotel_gallery/mobile/Ayatana,%20Coorg36981.jpg', options: ['Coorg', 'Mysore Palace', 'Hampi', 'Badami', 'Chitradurga Fort'] },
  { name: 'Jog Falls', image: 'https://im.whatshot.in/img/2021/Jul/jog-falls-is-1-cropped-1626932994.jpg?wp=1', options: ['Jog Falls', 'Coorg', 'Mysore Palace', 'Hampi', 'Badami'] },
  { name: 'Nandi Hills', image: 'https://static2.tripoto.com/media/filter/tst/img/789513/TripDocument/1536653036_hqdefault.jpg', options: ['Nandi Hills', 'Jog Falls', 'Coorg', 'Mysore Palace', 'Hampi'] },

  // Indian Locations
  { name: 'Taj Mahal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMxk9ctYVQuGZa-3pgpuclQDjdRBjRzFgBg&s', options: ['Taj Mahal', 'Qutub Minar', 'Red Fort', 'Hawa Mahal', 'Gateway of India'] },
  { name: 'Qutub Minar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTldw00Ya8vFHd3_T4PPyxXncFkTa0_z8E3NQ&s', options: ['Taj Mahal', 'Qutub Minar', 'Red Fort', 'Hawa Mahal', 'Gateway of India'] },
  { name: 'Red Fort', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVo3D8ybP8sRmYzU2tHxFZv2iOWO7zGA0LpQ&s', options: ['Taj Mahal', 'Qutub Minar', 'Red Fort', 'Hawa Mahal', 'Gateway of India'] },
  { name: 'Hawa Mahal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ812OHDZdnF57H64cBucK4J8EiM-duy9rs6A&s', options: ['Taj Mahal', 'Qutub Minar', 'Red Fort', 'Hawa Mahal', 'Gateway of India'] },
  { name: 'Gateway of India', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiYflyWrt5EX0YVN0l-Vs59GmZCACz3HGIg&s', options: ['Taj Mahal', 'Qutub Minar', 'Red Fort', 'Hawa Mahal', 'Gateway of India'] },
  { name: 'India Gate', image: 'https://images.news18.com/ibnlive/uploads/2022/01/india-gate.jpg', options: ['India Gate', 'Rashtrapati Bhavan', 'Jantar Mantar', 'Lotus Temple', 'Humayun’s Tomb'] },
  { name: 'Rashtrapati Bhavan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YjG7iHVpPXY-lkKbNhfig-KP7JUftWCFTw&s', options: ['India Gate', 'Rashtrapati Bhavan', 'Jantar Mantar', 'Lotus Temple', 'Humayun’s Tomb'] },
  { name: 'Jantar Mantar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbDxlhIXVNqPPPiELAJx0oKVSjqy5rc6c5A&s', options: ['India Gate', 'Rashtrapati Bhavan', 'Jantar Mantar', 'Lotus Temple', 'Humayun’s Tomb'] },
  { name: 'Lotus Temple', image: 'https://chardhambooking.com/wp-content/uploads/2021/01/Lotus-Tmple-Photo-by-Arpan-Das.jpg', options: ['India Gate', 'Rashtrapati Bhavan', 'Jantar Mantar', 'Lotus Temple', 'Humayun’s Tomb'] },
  { name: 'Humayun’s Tomb', image: 'https://www.drishtiias.com/images/uploads/1623837962_image2.png  ', options: ['India Gate', 'Rashtrapati Bhavan', 'Jantar Mantar', 'Lotus Temple', 'Humayun’s Tomb'] },

  
  // Global Locations
  { name: 'Eiffel Tower', image: 'https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg', options: ['Eiffel Tower', 'Great Wall of China', 'Statue of Liberty'] },
  { name: 'Great Wall of China', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1200px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg', options: ['Eiffel Tower', 'Great Wall of China', 'Statue of Liberty'] },
  { name: 'Statue of Liberty', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-E_4cNvqS9XVjqRGqYWM15vsT60OdexOijQWc5PgRtpNNKOReebhsPZ5zqOiDPfLMlU&usqp=CAU', options: ['Eiffel Tower', 'Great Wall of China', 'Statue of Liberty'] },
  { name: 'Colosseum', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1200px-Colosseo_2020.jpg', options: ['Colosseum', 'Machu Picchu', 'Christ the Redeemer', 'Pyramids of Giza', 'Big Ben'] },
  { name: 'Machu Picchu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/1200px-Machu_Picchu%2C_Peru.jpg', options: ['Colosseum', 'Machu Picchu', 'Christ the Redeemer', 'Pyramids of Giza', 'Big Ben'] },
  { name: 'Christ the Redeemer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjSBm4bqWIzpnbF10bsLbrT_wG1W3Db_srw&s', options: ['Colosseum', 'Machu Picchu', 'Christ the Redeemer', 'Pyramids of Giza', 'Big Ben'] },
  { name: 'Pyramids of Giza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxsM3weHd9K6M818KAJKrNePihvWIDaR2VmA&s', options: ['Colosseum', 'Machu Picchu', 'Christ the Redeemer', 'Pyramids of Giza', 'Big Ben'] },
  { name: 'Big Ben', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQms09QMLOq_8S5A5z3930E0sDLhJGvYWX8qQ&s', options: ['Colosseum', 'Machu Picchu', 'Christ the Redeemer', 'Pyramids of Giza', 'Big Ben'] },
  { name: 'Sydney Opera House', image: 'https://www.ludwig-van.com/main/wp-content/uploads/sites/6/2024/08/Sydney-Opera-House.jpg', options: ['Sydney Opera House', 'Taj Mahal', 'Great Wall of China', 'Statue of Liberty', 'Eiffel Tower'] },
  { name: 'Moscow Kremlin', image: 'https://cdn.britannica.com/26/116526-050-76C37BBC/Cathedral-of-St-Basil-the-Blessed-Moscow.jpg', options: ['Moscow Kremlin', 'Eiffel Tower', 'Great Wall of China', 'Statue of Liberty', 'Sydney Opera House'] }
];

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const shuffleOptions = (options) => {
  let shuffledOptions = options.slice();
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  return shuffledOptions;
};

const GuessOption = React.memo(({ option, index, selectedOption, onChange }) => (
  <div key={index} className="guess-option">
    <input
      type="radio"
      id={`option-${index}`}
      name="location"
      value={option}
      checked={selectedOption === option}
      onChange={onChange}
      className="guess-radio"
      aria-label={`Option ${option}`}
    />
    <label htmlFor={`option-${index}`} className="guess-label">
      {option}
    </label>
  </div>
));

const GuessTheLocation = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [replay, setReplay] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const shuffledLocations = shuffleArray(locations).slice(0, 10);
      setQuestions(shuffledLocations.map(location => ({
        ...location,
        options: shuffleOptions(location.options)
      })));
    }
  }, [gameStarted, replay]);

  const handleOptionChange = useCallback((e) => {
    setSelectedOption(e.target.value);
  }, []);

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.name) {
      setScore(prevScore => prevScore + 1);
      setMessage('Correct! Well done.');
    } else {
      setMessage(`Wrong! The correct answer was ${currentQuestion.name}.`);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption('');
      setMessage('');
    } else {
      setShowSubmit(true);
    }
  };

  const handleReplay = () => {
    setReplay(prev => !prev);
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setMessage('');
    setScore(0);
    setShowSubmit(false);
    setGameStarted(false);
  };

  const handleStart = () => {
    setGameStarted(true);
    setReplay(false);
  };

  if (!gameStarted) {
    return (
      <div className='location-container'>
      <div className="guess-container">
        <h1 className="heading">Guess the Location</h1>
        <img src={startImage} alt="Start Game" className="start-image" /><br/>
        <button onClick={handleStart} className="start-button">Start Game</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return <div className="loading">Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const serialNumber = currentQuestionIndex + 1;

  return (
  <div className='location-container'>
    <div className="guess-container">
      <h1 className="heading">Guess the Location</h1>
      {!showSubmit && (
        <>
          <div className="location-image-container">
            <LazyLoadImage
              src={currentQuestion.image}
              alt="Location"
              className="location-image"
              effect="blur"
              loading="lazy"
            />
          </div>
          <div className="question-container">
            <p className="serial-number">Question {serialNumber}:</p>
            <form className="guess-form">
              {currentQuestion.options.map((option, index) => (
                <GuessOption
                  key={index}
                  option={option}
                  index={index}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                />
              ))}
            </form>
            <button onClick={handleSubmit} className="guess-button">Submit</button>
            {message && <p className="message">{message}</p>}
          </div>
        </>
      )}
      {showSubmit && (
        <div className="score-container">
          <p className="score-message">Your final score is {score} out of {questions.length}.</p>
          <button onClick={handleReplay} className="replay-button">Replay</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default GuessTheLocation;
