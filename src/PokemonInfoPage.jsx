import { useState } from "react";
import "./App.css";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./t.css";

function PokemonInfoPage() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [isPokemonCorrect, setIsPokemonCorrect] = useState(true);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defence: "",
    type: "",
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchPokemon();
    }
  };
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defence: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
        setIsPokemonCorrect(true);
      })
      .catch((error) => {
        console.log(error);
        setIsPokemonCorrect(false);
      });
  };
  return (
    <>
      <div className="Apps">
        <div className="titleSection">
          <h1>Search a Pokemon</h1>
          <input
            type="text"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
          <button onClick={searchPokemon}>Search Pokemon</button> <br />
          <br />
          <NavLink to={"/"} className={"second"}>
            Back
          </NavLink>
        </div>
        <div className="displaySection">
          {!pokemonChosen ? (
            <h1>Please Choose a Pokemon</h1>
          ) : isPokemonCorrect ? (
            <>
              <h1>{pokemon.name.toLocaleUpperCase()}</h1>
              <div className="result">
                <div>
                  <img src={pokemon.img} alt={pokemon.name} />
                </div>
                <div>
                  <h3>Species : {pokemon.species}</h3>
                  <h3>Type : {pokemon.type}</h3>
                  <h4>HP: {pokemon.hp}</h4>
                  <h4>Attack: {pokemon.attack}</h4>
                  <h4>Defence: {pokemon.defence}</h4>
                </div>
              </div>
            </>
          ) : (
            <h1>Please type a correct name</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default PokemonInfoPage;
