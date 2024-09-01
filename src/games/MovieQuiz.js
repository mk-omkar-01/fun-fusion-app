import React, { useState, useEffect } from 'react';
import './styles/MovieQuiz.css';
import movie from '../images/movie.jpg';

const movies = [
  { emoji: "☝️ + tha + 🐯", title: "Ek tha tiger" },
  { emoji: "🚀+👨‍🚀+🟠", title: "Mission Mangal" },
  { emoji: "🏏 + 🎉", title: "Lagaan" },
  { emoji: "❤️+☂️+🙋", title: "Dil Chahta Hai" },
  { emoji: "👑 + 🔫", title: "Baahubali" },
  { emoji: "🕵️‍♂️ + 💼", title: "Detective Byomkesh Bakshi" },
  { emoji: "👸🏻", title: "Queen" },
  { emoji: "🤓 + 🤓 + 🤓 ", title: "3 Idiots" },
  { emoji: "👨🏽‍🎓 + 🗓️ + 🕺", title: "Student of the Year" },
  { emoji: "😎 + ❤️ + Singh", title: "Kabir Singh" },
  { emoji: "𝒦 + 👨‍👦‍👦", title: "Kapoor & Sons" },
  { emoji: "😊 + ❤️ + chhore", title: "Chhichhore" },
  { emoji: "📖 + ✍", title: "Kahaani" },
  { emoji: "👰🏻 + 🤵", title: "Tanu Weds Manu" },
  { emoji: "❤️ + 🤵 + 👰🏻 ", title: "Dilwale Dulhania Le Jayenge" },
  { emoji: "👨‍🦯 + 🕶 ", title: "Andhadhun" },
  { emoji: "🌠 + 🏝️", title: "Taare Zameen Par" },
  { emoji: "👫 + ❤️ + 🚇", title: "Chennai Express" },
  { emoji: "🔫 + 👮", title: "Singham" },
  { emoji: "🧇 + 😋", title: "Barfi!" },
  { emoji: "🕵️‍♂️ + 🔍", title: "Drishyam" },
  { emoji: "👩🏻 + 🏰 + 🗡️", title: "Padmavat" },
  { emoji: "Ʀ + 🦹 + ☝️", title: "Ra.One" },
  { emoji: "👫 + 👩🏻‍💼", title: "Pati Patni Aur Woh" },
  { emoji: "🕒 + ⏳", title: "Waqt" },
];

const getRandomOptions = (correctAnswer) => {
  const allTitles = movies.map(movie => movie.title);
  const incorrectOptions = allTitles.filter(title => title !== correctAnswer);
  const randomOptions = new Set([correctAnswer]);
  
  while (randomOptions.size < 4) {
    const randomTitle = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
    randomOptions.add(randomTitle);
  }
  return Array.from(randomOptions).sort(() => Math.random() - 0.5); // Shuffle options
};

function MovieQuiz() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [unaskedQuestions, setUnaskedQuestions] = useState(movies);

  useEffect(() => {
    if (isStarted) {
      startNewQuestion();
    }
  }, [isStarted]);

  useEffect(() => {
    if (currentMovie) {
      setOptions(getRandomOptions(currentMovie.title));
    }
  }, [currentMovie]);

  const startNewQuestion = () => {
    if (questionCount >= 10) {
      setQuizFinished(true);
      return;
    }

    if (unaskedQuestions.length === 0) {
      setFeedback('No more questions left.');
      setQuizFinished(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unaskedQuestions.length);
    const selectedMovie = unaskedQuestions[randomIndex];
    setCurrentMovie(selectedMovie);
    setUnaskedQuestions(prevQuestions => prevQuestions.filter((_, index) => index !== randomIndex));
    setFeedback('');
    setSelectedOption('');
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === currentMovie.title) {
      setFeedback('Correct!');
      setScore(prevScore => prevScore + 1);
    } else {
      setFeedback('Try again!');
    }

    setQuestionCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount >= 10) {
            setQuizFinished(true);
        } else {
            setTimeout(startNewQuestion, 1000); // Delay before loading new question
        }
        return newCount;
    });
  };

  const handleStart = () => {
    setIsStarted(true);
    setQuestionCount(0);
    setScore(0);
    setQuizFinished(false);
    setUnaskedQuestions(movies.slice()); // Reset the list of unasked questions
  };

  const handleReplay = () => {
    setIsStarted(false);
    setCurrentMovie(null);
    setOptions([]);
    setSelectedOption('');
    setFeedback('');
    setQuestionCount(0);
    setScore(0);
    setQuizFinished(false);
    setUnaskedQuestions(movies.slice()); // Reset the list of unasked questions
  };

  return (
    <div className='movie-background'>
    <div className="quiz-container">
      <h1>Guess the Indian Movie by Emoji</h1>
      {!isStarted && (
        <img 
          src={movie} 
          alt="Movie Quiz" 
          className="quiz-image" 
        />
      )}
      {quizFinished ? (
        <div className="final-score">
          <h2>Quiz Finished!</h2>
          <p>Your final score: {score} / 10</p>
          <button onClick={handleReplay}>Replay</button>
        </div>
      ) : (
        <>
          {!isStarted ? (
            <button onClick={handleStart}>Start Quiz</button>
          ) : (
            <>
              <div className="emoji-display">
                {currentMovie && currentMovie.emoji}
              </div>
              <form onSubmit={handleGuessSubmit}>
                {options.map(option => (
                  <div key={option} className="option">
                    <input
                      type="radio"
                      id={option}
                      name="movie"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
                <button type="submit" className='submit'>Submit</button>
              </form>
              <p className="feedback">{feedback}</p>
              <p className="question-count">Questions Answered: {questionCount}</p>
            </>
          )}
        </>
      )}
    </div>
    </div>
    );
}

export default MovieQuiz;
