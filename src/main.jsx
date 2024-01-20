import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomPokemonPage from "./RandomPokemonPage";
import PokemonInfoPage from "./PokemonInfoPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RandomPokemonPage />} />
        <Route path="pokemonInfo" element={<PokemonInfoPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
