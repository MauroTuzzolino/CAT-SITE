import React, { useState, useEffect } from "react";
import { Button, Modal, ProgressBar, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/CatQuiz.css";

const questionsPool = [
  {
    question: "You find a new object on the floor. What do you do?",
    options: [
      { text: "Sniff it carefully first.", cat: "Siamese" },
      { text: "Bash it off the table immediately!", cat: "Bengal" },
      { text: "Stare at it for 5 minutes, then walk away.", cat: "British Shorthair" },
      { text: "Lick it, obviously.", cat: "Sphynx" },
    ],
  },
  {
    question: "Your human is reading a book. You…",
    options: [
      { text: "Sit on the book.", cat: "Maine Coon" },
      { text: "Curl next to them quietly.", cat: "Persian" },
      { text: "Knock the book off and demand attention.", cat: "Siamese" },
      { text: "Walk away; reading is boring.", cat: "Norwegian Forest Cat" },
    ],
  },
  {
    question: "Someone rings the doorbell!",
    options: [
      { text: "Hide immediately.", cat: "Russian Blue" },
      { text: "Run to greet them.", cat: "Ragdoll" },
      { text: "Hiss from afar.", cat: "Scottish Fold" },
      { text: "Pretend you didn’t hear it.", cat: "Sphynx" },
    ],
  },
  {
    question: "How do you handle strangers?",
    options: [
      { text: "Friendly and curious.", cat: "Ragdoll" },
      { text: "Suspicious but polite.", cat: "Chartreux" },
      { text: "Hide under the bed.", cat: "Russian Blue" },
      { text: "Jump in their lap immediately.", cat: "Siamese" },
    ],
  },
  {
    question: "What’s your ideal nap spot?",
    options: [
      { text: "On top of the fridge.", cat: "Bengal" },
      { text: "In a warm laundry basket.", cat: "Persian" },
      { text: "By the window with sunbeams.", cat: "Maine Coon" },
      { text: "Anywhere soft and dark.", cat: "Scottish Fold" },
    ],
  },
  {
    question: "Favorite time of day?",
    options: [
      { text: "Midnight — pure silence.", cat: "Russian Blue" },
      { text: "Afternoon naps!", cat: "Persian" },
      { text: "Sunrise — I love to meow then!", cat: "Siamese" },
      { text: "Whenever it’s feeding time.", cat: "Maine Coon" },
    ],
  },
  {
    question: "You’re given a box. What happens?",
    options: [
      { text: "Instantly jump inside.", cat: "British Shorthair" },
      { text: "Inspect it thoroughly.", cat: "Chartreux" },
      { text: "Ignore it — I prefer open spaces.", cat: "Bengal" },
      { text: "Sit next to it.", cat: "Sphynx" },
    ],
  },
  {
    question: "If you had a job, what would it be?",
    options: [
      { text: "Yoga instructor — calm and flexible.", cat: "Ragdoll" },
      { text: "Detective — I see all.", cat: "Siamese" },
      { text: "King — others do my bidding.", cat: "Maine Coon" },
      { text: "Explorer — wild and curious.", cat: "Bengal" },
    ],
  },
  {
    question: "How do you feel about water?",
    options: [
      { text: "Love it! I even swim.", cat: "Turkish Van" },
      { text: "No thanks, I melt.", cat: "Persian" },
      { text: "Tolerate it, maybe.", cat: "Chartreux" },
      { text: "Splash it everywhere!", cat: "Bengal" },
    ],
  },
  {
    question: "How do you wake your human up?",
    options: [
      { text: "Soft paw tap.", cat: "Ragdoll" },
      { text: "Full-on face stomp.", cat: "Siamese" },
      { text: "Meow loudly and endlessly.", cat: "Bengal" },
      { text: "Wait patiently… maybe.", cat: "Persian" },
    ],
  },
  {
    question: "What’s your favorite toy?",
    options: [
      { text: "Laser pointer.", cat: "Bengal" },
      { text: "Feather wand.", cat: "Siamese" },
      { text: "Cardboard box.", cat: "British Shorthair" },
      { text: "A simple ball of yarn.", cat: "Persian" },
    ],
  },
  {
    question: "Your personality in one word?",
    options: [
      { text: "Elegant.", cat: "Chartreux" },
      { text: "Playful.", cat: "Bengal" },
      { text: "Chill.", cat: "Ragdoll" },
      { text: "Curious.", cat: "Siamese" },
    ],
  },
  {
    question: "Favorite place in the house?",
    options: [
      { text: "Windowsill.", cat: "Maine Coon" },
      { text: "Under the bed.", cat: "Russian Blue" },
      { text: "On top of the fridge.", cat: "Bengal" },
      { text: "Human’s lap.", cat: "Siamese" },
    ],
  },
  {
    question: "How do you react to vacuum cleaners?",
    options: [
      { text: "Run for my life!", cat: "Russian Blue" },
      { text: "Stand my ground.", cat: "Maine Coon" },
      { text: "Hiss and hide.", cat: "Scottish Fold" },
      { text: "Curious sniff.", cat: "Sphynx" },
    ],
  },
  {
    question: "Your human drops food on the floor. You…",
    options: [
      { text: "Sniff cautiously.", cat: "Chartreux" },
      { text: "Devour it instantly.", cat: "Bengal" },
      { text: "Wait for them to pick it up.", cat: "Persian" },
      { text: "Play with it first.", cat: "Siamese" },
    ],
  },
  {
    question: "How social are you?",
    options: [
      { text: "I love everyone!", cat: "Ragdoll" },
      { text: "Selective company only.", cat: "Russian Blue" },
      { text: "Depends on my mood.", cat: "Siamese" },
      { text: "I’m the boss, others follow.", cat: "Maine Coon" },
    ],
  },
  {
    question: "Preferred weather?",
    options: [
      { text: "Sunny and warm.", cat: "Siamese" },
      { text: "Rainy — perfect nap weather.", cat: "Persian" },
      { text: "Snowy adventure!", cat: "Norwegian Forest Cat" },
      { text: "Whatever, I stay indoors.", cat: "British Shorthair" },
    ],
  },
  {
    question: "How do you spend your free time?",
    options: [
      { text: "Exploring everything.", cat: "Bengal" },
      { text: "Sleeping all day.", cat: "Persian" },
      { text: "Observing silently.", cat: "Chartreux" },
      { text: "Following my human.", cat: "Siamese" },
    ],
  },
  {
    question: "A new cat appears in your house. You…",
    options: [
      { text: "Greet them kindly.", cat: "Ragdoll" },
      { text: "Defend your territory.", cat: "Bengal" },
      { text: "Hide and observe.", cat: "Russian Blue" },
      { text: "Ignore them.", cat: "British Shorthair" },
    ],
  },
  {
    question: "What’s your energy level?",
    options: [
      { text: "Hyperactive!", cat: "Bengal" },
      { text: "Balanced and calm.", cat: "Maine Coon" },
      { text: "Low and lazy.", cat: "Persian" },
      { text: "Depends on the moon.", cat: "Siamese" },
    ],
  },
  {
    question: "When faced with a challenge, you…",
    options: [
      { text: "Solve it logically.", cat: "Chartreux" },
      { text: "Panic first, then fix it.", cat: "Sphynx" },
      { text: "Ask for help.", cat: "Ragdoll" },
      { text: "Ignore it and nap.", cat: "Persian" },
    ],
  },
  {
    question: "Favorite human activity?",
    options: [
      { text: "Cooking — smells are fun.", cat: "Bengal" },
      { text: "Reading quietly.", cat: "Chartreux" },
      { text: "Sleeping.", cat: "Persian" },
      { text: "Talking — I meow back.", cat: "Siamese" },
    ],
  },
  {
    question: "If you could talk, your first word would be…",
    options: [
      { text: "‘Food.’", cat: "Maine Coon" },
      { text: "‘Hello.’", cat: "Ragdoll" },
      { text: "‘Now.’", cat: "Siamese" },
      { text: "‘Leave me alone.’", cat: "British Shorthair" },
    ],
  },
  {
    question: "Favorite color?",
    options: [
      { text: "Gold.", cat: "Bengal" },
      { text: "Blue.", cat: "Russian Blue" },
      { text: "White.", cat: "Persian" },
      { text: "Black.", cat: "Sphynx" },
    ],
  },
  {
    question: "You see a laser dot on the floor. Reaction?",
    options: [
      { text: "Pounce instantly!", cat: "Bengal" },
      { text: "Watch, unimpressed.", cat: "Chartreux" },
      { text: "Try to outsmart it.", cat: "Siamese" },
      { text: "Too lazy to care.", cat: "Persian" },
    ],
  },
  {
    question: "Preferred sleeping style?",
    options: [
      { text: "Curled in a ball.", cat: "British Shorthair" },
      { text: "Spread eagle!", cat: "Bengal" },
      { text: "Upside down, of course.", cat: "Sphynx" },
      { text: "Under the blanket.", cat: "Persian" },
    ],
  },
  {
    question: "How do you react to being picked up?",
    options: [
      { text: "Purr happily.", cat: "Ragdoll" },
      { text: "Squirm immediately.", cat: "Bengal" },
      { text: "Tolerate politely.", cat: "Chartreux" },
      { text: "Sulk later.", cat: "Siamese" },
    ],
  },
  {
    question: "What do you dream about?",
    options: [
      { text: "Hunting birds.", cat: "Bengal" },
      { text: "Luxury naps.", cat: "Persian" },
      { text: "Traveling the world.", cat: "Maine Coon" },
      { text: "Infinite snacks.", cat: "Siamese" },
    ],
  },
  {
    question: "You’re locked out of your favorite room. Reaction?",
    options: [
      { text: "Meow endlessly.", cat: "Siamese" },
      { text: "Scratch the door.", cat: "Bengal" },
      { text: "Wait patiently.", cat: "Persian" },
      { text: "Find another way in.", cat: "Chartreux" },
    ],
  },
  {
    question: "If you could live anywhere, where would it be?",
    options: [
      { text: "Forest cabin.", cat: "Norwegian Forest Cat" },
      { text: "Modern penthouse.", cat: "Sphynx" },
      { text: "Sunny villa.", cat: "Siamese" },
      { text: "Mountain lodge.", cat: "Maine Coon" },
    ],
  },
  {
    question: "When you meet someone new, you…",
    options: [
      { text: "Rub their leg immediately.", cat: "Ragdoll" },
      { text: "Observe quietly first.", cat: "Russian Blue" },
      { text: "Demand petting!", cat: "Siamese" },
      { text: "Ignore them completely.", cat: "British Shorthair" },
    ],
  },
];

const CatQuiz = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(60);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultCat, setResultCat] = useState(null);
  const [progressDeg, setProgressDeg] = useState(360);
  const [quitQuiz, setQuitQuiz] = useState(false);

  // Seleziona 8 domande random
  useEffect(() => {
    if (started) {
      const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 8));
      setTimer(60);
      setProgressDeg(360);
    }
  }, [started]);

  // Timer countdown
  useEffect(() => {
    if (!started || showResult) return;
    if (timer <= 0) {
      handleNextQuestion();
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
      setProgressDeg((prev) => Math.max(prev - 360 / 60, 0));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, started]);

  const handleStart = () => setStarted(true);

  const handleSelect = (opt) => {
    setSelectedOption(opt.text);
    setScores((prev) => ({
      ...prev,
      [opt.cat]: (prev[opt.cat] || 0) + 1,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setTimer(60);
      setProgressDeg(360);
    } else {
      handleShowResult();
    }
  };

  const handleShowResult = () => {
    const topCat = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];
    setResultCat(topCat);
    setShowResult(true);
  };

  const handleLeaveQuiz = () => setShowLeaveModal(true);

  const confirmLeave = () => {
    setShowLeaveModal(false);
    setTimeout(() => setQuitQuiz(true), 300); // breve fade
  };

  // === SCHERMATA ABBANDONO ===
  if (quitQuiz) {
    return (
      <div className="quit-screen d-flex flex-column justify-content-center align-items-center text-center fade-in">
        <div className="quit-card">
          <h1 className="mb-3">😿 Oh no, you left us!</h1>
          <p className="mb-4">
            The cats are disappointed... <br />
            They were so curious to know your true spirit! 🐾
          </p>
          <Button variant="warning" onClick={() => navigate("/")}>
            Back Home 🏠
          </Button>
        </div>
      </div>
    );
  }

  // === SCHERMATA RISULTATO ===
  if (showResult) {
    return (
      <div className="result-screen d-flex flex-column justify-content-center align-items-center text-center">
        <div className="result-card">
          <div className="result-header mb-4">
            <h2 className="fw-bold mb-2">✨ You are a {resultCat}! ✨</h2>
            <p className="subtext">Welcome to the feline elite club.</p>
          </div>

          <img
            src={`https://cdn2.thecatapi.com/images/${
              {
                Siamese: "ai6Jps4sx.jpg",
                Bengal: "O3btzLlsO.png",
                Persian: "4RzEwvyzz.jpg",
                MaineCoon: "duRz5WATd.jpg",
                Ragdoll: "oGefY4YoG.jpg",
                Sphynx: "BDb8ZXb1v.jpg",
                BritishShorthair: "s4wQfYoEk.jpg",
                Chartreux: "j6oFGLpRG.jpg",
                RussianBlue: "DbwiefiaY.jpg",
                ScottishFold: "6f6p3n8KX.jpg",
                NorwegianForestCat: "7DvrV2GdJ.jpg",
                TurkishVan: "1E3fgWb0q.jpg",
              }[resultCat] || "MTY3ODIyMQ.jpg"
            }`}
            alt={resultCat}
            className="result-img mb-4"
          />

          <p className="result-text mb-4">
            {resultCat
              ? `You share the spirit of the ${resultCat} — graceful, unique, and absolutely charming!`
              : "You’re a mysterious mix of all cats... a true enigma! 🐾"}
          </p>

          <div className="result-buttons d-flex gap-3 justify-content-center mb-4">
            <Button variant="warning" onClick={() => navigate("/")}>
              Back Home
            </Button>
          </div>

          <div className="stats-section">
            <h5 className="stats-heading mb-2">Your Score Breakdown</h5>
            <ul className="stats-list">
              {Object.entries(scores)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, cnt], idx) => (
                  <li key={idx} className="stats-item">
                    <span className="cat-name">{cat}</span>
                    <span className="cat-score">{cnt}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // === INTRO SCHERMATA ===
  if (!started) {
    const catImages = [
      "https://images.unsplash.com/photo-1602418013963-c1f017b3bb63?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXRpZnVsJTIwY2F0fGVufDB8fDB8fHww",
      "https://t4.ftcdn.net/jpg/07/25/37/55/360_F_725375513_EBumgmIjOBFbVZPtfOYLDQDa7tIwlsMc.jpg",
      "https://wallpapercat.com/w/full/a/e/5/24157-1920x1200-desktop-hd-cat-wallpaper-image.jpg",
      "https://wallpapercave.com/wp/wp9016413.jpg",
      "https://img.freepik.com/premium-photo/black-cat-with-bright-eyes-against-black-background_441873-28.jpg?semt=ais_hybrid&w=740&q=80",
      "https://wallpapershome.com/images/pages/pic_h/881.jpg",
      "https://media.istockphoto.com/id/497315278/photo/two-friendly-cats.jpg?s=612x612&w=0&k=20&c=n7Fnn9SBZNEJPKItgAtlyl-uGZxQ1enkHXMrvQ_KNNQ=",
      "https://wallpapershome.com/images/pages/pic_h/726.jpg",
      "https://c4.wallpaperflare.com/wallpaper/181/179/710/cat-mammal-dandelion-flower-wallpaper-preview.jpg",
      "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?cs=srgb&dl=pexels-pixabay-416160.jpg&fm=jpg",
    ];

    return (
      <div className="quiz-intro-screen">
        <div className="bg-fade-container">
          {catImages.map((img, i) => (
            <div
              key={i}
              className="fade-bg"
              style={{
                backgroundImage: `url(${img})`,
                animationDelay: `${i * 3}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="intro-box text-center">
          <h1 className="fw-bold mb-4">🐱 Cat Personality Quiz</h1>
          <p className="mb-4">Discover your inner feline energy...</p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="outline-light" onClick={() => navigate("/")}>
              ← Back Home
            </Button>
            <Button variant="warning" onClick={handleStart}>
              Start Quiz 🚀
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // === QUIZ IN CORSO ===
  return (
    <div className="quiz-container d-flex flex-column justify-content-center align-items-center text-center fade-in">
      <div className="quiz-card">
        {/* Header */}
        <div className="quiz-header d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-light">
            Question {currentQuestion + 1} / {questions.length}
          </h5>
          <Button variant="outline-danger" size="sm" onClick={handleLeaveQuiz}>
            Leave ✖
          </Button>
        </div>

        {/* Timer barra con zampina */}
        <div className="timer-bar-wrapper mb-5">
          <div
            className="timer-bar"
            style={{
              width: `${(timer / 60) * 100}%`,
            }}
          >
            <span
              className="paw-emoji"
              style={{
                left: `calc(${(timer / 60) * 100}% - 20px)`,
              }}
            >
              🐾
            </span>
          </div>
        </div>

        {/* Domanda + Opzioni con animazione */}
        <div key={currentQuestion} className="question-slide fade-in">
          <h3 className="question-text mb-4">{questionsPool[currentQuestion].question}</h3>

          <div className="options-wrapper d-flex flex-column gap-3">
            {questionsPool[currentQuestion].options.map((opt, idx) => (
              <Button key={idx} className={`option-btn ${selectedOption === opt.text ? "selected" : ""}`} onClick={() => handleSelect(opt)}>
                {opt.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Next */}
        <Button variant="primary" className="mt-5 next-btn" disabled={!selectedOption} onClick={handleNextQuestion}>
          Next →
        </Button>
      </div>

      {/* Popup conferma abbandono */}
      <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)} centered backdrop="static" dialogClassName="leave-modal">
        <div className="custom-modal-content text-center">
          <div className="modal-icon mb-3">😿</div>
          <h4 className="fw-bold mb-3">Leave the Quiz?</h4>
          <p className="modal-text mb-4">
            Are you sure you want to quit now? <br />
            Your progress will be lost forever...
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="outline-light" onClick={() => setShowLeaveModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmLeave}>
              Leave Quiz
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CatQuiz;
