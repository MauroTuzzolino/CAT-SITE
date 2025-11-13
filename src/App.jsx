import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Razze from "./pages/Breeds";
import Home from "./pages/Home";
import WildFelines from "./pages/WildFelines";
import CatPlanet from "./pages/CatPlanet";
import CatQuiz from "./pages/CatQuiz";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breeds" element={<Razze />} />
          <Route path="/wildcats" element={<WildFelines />} />
          <Route path="/cat-planet" element={<CatPlanet />} />
          <Route path="/cat-quiz" element={<CatQuiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
