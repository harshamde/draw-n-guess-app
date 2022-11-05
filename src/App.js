import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import GameBoard from "./components/gameBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<LandingPage />} />
        <Route path="/game-board" exact={true} element={<GameBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
