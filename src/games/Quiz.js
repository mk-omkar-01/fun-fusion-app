import React, { useState, useEffect } from 'react';
import './styles/Quiz.css';

const getRandomQuestions = (allQuestions, numQuestions) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
};
const shuffleChoices = (choices) => {
    return [...choices].sort(() => 0.5 - Math.random());
};


const allQuestions = [
    // Meme Questions
    { question: "What meme is known for the phrase 'Distracted Boyfriend'?", choices: shuffleChoices(["Distracted Boyfriend", "Mocking SpongeBob", "Pepe the Frog", "Arthur's Fist"]), answer: "Distracted Boyfriend" },
    { question: "Which meme features a frog with a smug expression?", choices: shuffleChoices(["Doge", "Pepe the Frog", "Drake Hotline Bling", "Is This a Pigeon?"]), answer: "Pepe the Frog" },
    // ... (remaining meme questions)
  
    // Computer Science Questions
    { question: "What is the primary function of the CPU in a computer?", choices: shuffleChoices(["Processing data", "Storing data", "Networking", "Displaying data"]), answer: "Processing data" },
    { question: "Which programming language is known as the mother of all languages?", choices: shuffleChoices(["C", "Python", "Java", "Fortran"]), answer: "C" },
    { question: "What does HTML stand for?", choices: shuffleChoices(["HyperText Markup Language", "HyperText Multiple Language", "HighText Markup Language", "HyperText Markup Logic"]), answer: "HyperText Markup Language" },
    { question: "Which device is used to connect a computer to a network?", choices: shuffleChoices(["Router", "Monitor", "Keyboard", "Printer"]), answer: "Router" },
    { question: "What is the main purpose of an operating system?", choices: shuffleChoices(["Manage hardware resources", "Run applications", "Connect to the internet", "Store data"]), answer: "Manage hardware resources" },
    { question: "Which of the following is a high-level programming language?", choices: shuffleChoices(["Assembly", "Java", "Machine Code", "C++"]), answer: "Java" },
    { question: "What does GUI stand for in computing?", choices: shuffleChoices(["Graphical User Interface", "General User Interface", "Graphical Unique Interface", "General Unique Interface"]), answer: "Graphical User Interface" },
    { question: "What is an algorithm?", choices: shuffleChoices(["A set of instructions to solve a problem", "A type of programming language", "A hardware component", "A software application"]), answer: "A set of instructions to solve a problem" },
    { question: "Which protocol is used to send email over the internet?", choices: shuffleChoices(["SMTP", "FTP", "HTTP", "DNS"]), answer: "SMTP" },
    { question: "What is the function of RAM in a computer?", choices: shuffleChoices(["Temporary data storage", "Permanent data storage", "Processing data", "Networking"]), answer: "Temporary data storage" },
    { question: "What does URL stand for?", choices: shuffleChoices(["Uniform Resource Locator", "Uniform Resource Link", "Universal Resource Locator", "Universal Resource Link"]), answer: "Uniform Resource Locator" },
    { question: "What is the purpose of a compiler?", choices: shuffleChoices(["Translate high-level code to machine code", "Execute machine code directly", "Debug software", "Manage hardware resources"]), answer: "Translate high-level code to machine code" },
    { question: "Which of the following is a database management system?", choices: shuffleChoices(["MySQL", "Java", "HTML", "CSS"]), answer: "MySQL" },
    { question: "What is the main difference between a virus and malware?", choices: shuffleChoices(["Virus replicates itself, malware is general malicious software", "Virus is a type of malware, malware is not", "Malware replicates itself, virus is general malicious software", "There is no difference"]), answer: "Virus replicates itself, malware is general malicious software" },
    { question: "What is the function of a firewall?", choices: shuffleChoices(["Protects against unauthorized access", "Boosts internet speed", "Stores files", "Runs software applications"]), answer: "Protects against unauthorized access" },
    { question: "What does the acronym HTTP stand for?", choices: shuffleChoices(["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HighText Transfer Protocol", "HighText Transmission Protocol"]), answer: "HyperText Transfer Protocol" },
    { question: "What is a software bug?", choices: shuffleChoices(["An error in the software", "A type of hardware failure", "A virus", "A feature of the software"]), answer: "An error in the software" },
    { question: "What is cloud computing?", choices: shuffleChoices(["Storing and accessing data over the internet", "A type of physical hardware", "A programming language", "A type of malware"]), answer: "Storing and accessing data over the internet" },
    { question: "Which language is known as the language of the web?", choices: shuffleChoices(["HTML", "Java", "Python", "C++"]), answer: "HTML" },
    { question: "What does the acronym SQL stand for?", choices: shuffleChoices(["Structured Query Language", "Simple Query Language", "Structured Question Language", "Simple Question Language"]), answer: "Structured Query Language" },
    { question: "What is the purpose of an operating system kernel?", choices: shuffleChoices(["Manages hardware resources", "Runs applications", "Provides internet access", "Stores files"]), answer: "Manages hardware resources" },
    { question: "Which of the following is a version control system?", choices: shuffleChoices(["Git", "MySQL", "Java", "HTML"]), answer: "Git" },
  
    // General Knowledge Questions
    { question: "What is the capital of India?", choices: shuffleChoices(["New Delhi", "Mumbai", "Kolkata", "Chennai"]), answer: "New Delhi" },
    { question: "Who was the first President of India?", choices: shuffleChoices(["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Mahatma Gandhi", "Dr. Sarvepalli Radhakrishnan"]), answer: "Dr. Rajendra Prasad" },
    { question: "Which river is the longest in India?", choices: shuffleChoices(["Ganges", "Yamuna", "Brahmaputra", "Godavari"]), answer: "Ganges" },
    { question: "Who wrote the national anthem of India?", choices: shuffleChoices(["Rabindranath Tagore", "Subhas Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru"]), answer: "Rabindranath Tagore" },
    { question: "Which Indian state is known as the 'Land of Golden Temple'?", choices: shuffleChoices(["Punjab", "Haryana", "Rajasthan", "Uttar Pradesh"]), answer: "Punjab" },
    { question: "What is the national currency of India?", choices: shuffleChoices(["Rupee", "Dollar", "Euro", "Yen"]), answer: "Rupee" },
    { question: "Which festival is known as the 'Festival of Lights' in India?", choices: shuffleChoices(["Diwali", "Holi", "Eid", "Christmas"]), answer: "Diwali" },
    { question: "Who was the first Prime Minister of India?", choices: shuffleChoices(["Jawaharlal Nehru", "Lal Bahadur Shastri", "Indira Gandhi", "Rajiv Gandhi"]), answer: "Jawaharlal Nehru" },
    { question: "Which Indian city is famous for its film industry, known as Bollywood?", choices: shuffleChoices(["Mumbai", "Delhi", "Kolkata", "Chennai"]), answer: "Mumbai" },
    { question: "What is the name of the Indian space agency?", choices: shuffleChoices(["ISRO", "NASA", "ESA", "JAXA"]), answer: "ISRO" },
    { question: "Which mountain range forms the northern boundary of India?", choices: shuffleChoices(["Himalayas", "Alps", "Rockies", "Andes"]), answer: "Himalayas" },
    { question: "Which Indian leader is known as the 'Iron Man of India'?", choices: shuffleChoices(["Sardar Vallabhbhai Patel", "Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose"]), answer: "Sardar Vallabhbhai Patel" },
    { question: "Which Indian state is known for its backwaters?", choices: shuffleChoices(["Kerala", "Goa", "Tamil Nadu", "West Bengal"]), answer: "Kerala" },
    { question: "Who was the first woman Prime Minister of India?", choices: shuffleChoices(["Indira Gandhi", "Pratibha Patil", "Sarojini Naidu", "Mamata Banerjee"]), answer: "Indira Gandhi" },
    { question: "Which Indian river is considered sacred by Hindus?", choices: shuffleChoices(["Ganges", "Yamuna", "Brahmaputra", "Godavari"]), answer: "Ganges" },
    { question: "What is the national flower of India?", choices: shuffleChoices(["Lotus", "Rose", "Sunflower", "Lily"]), answer: "Lotus" },
    { question: "Which Indian city is known as the 'Pink City'?", choices: shuffleChoices(["Jaipur", "Agra", "Udaipur", "Jodhpur"]), answer: "Jaipur" },
    { question: "Who is the author of 'The God of Small Things'?", choices: shuffleChoices(["Arundhati Roy", "Ruskin Bond", "Chetan Bhagat", "Jhumpa Lahiri"]), answer: "Arundhati Roy" },
    { question: "What is the official language of India?", choices: shuffleChoices(["Hindi", "English", "Bengali", "Telugu"]), answer: "Hindi" },
    { question: "Which Indian leader is known for his role in the Indian independence movement and his philosophy of non-violence?", choices: shuffleChoices(["Mahatma Gandhi", "Jawaharlal Nehru", "Bhagat Singh", "Subhas Chandra Bose"]), answer: "Mahatma Gandhi" }
];

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        const selectedQuestions = getRandomQuestions(allQuestions, 10);
        setQuestions(selectedQuestions);
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedOption(null);
        } else {
            setShowScore(true);
        }
    };

    const handleReplay = () => {
        setQuestions(getRandomQuestions(allQuestions, 10));
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowScore(false);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-background">
            <div className="quiz-container">
                {showScore ? (
                    <>
                        <h1 className="quiz-title">Quiz Complete</h1>
                        <h2 className="quiz-score">Your score is {score} out of {questions.length}</h2>
                        <button className="replay-button" onClick={handleReplay}>Replay</button>
                    </>
                ) : (
                    <>
                        <h1 className="quiz-title">Quiz</h1>
                        <div className="quiz-question-container">
                            <h2 className="quiz-question">
                                {`${currentQuestionIndex + 1}. ${currentQuestion.question}`}
                            </h2>
                            <div className="quiz-options">
                                {currentQuestion.choices.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`quiz-option ${selectedOption === option ? 'selected' : ''}`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                            <button className="next-button" onClick={handleNextQuestion} disabled={!selectedOption}>
                                Next Question
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz;
