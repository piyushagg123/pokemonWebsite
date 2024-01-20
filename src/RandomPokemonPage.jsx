import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./s.css";
import pokeball from "./images/pokeball.jpg";

function RandomPokemonPage() {
  const [randomPokemon, setRandomPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defence: "",
    type: "",
  });

  useEffect(() => {
    getRandomPokemon();
  }, []); // Run the function on component mount

  const getRandomPokemon = () => {
    const randomPokemonId = Math.floor(Math.random() * 898) + 1; // Generate a random Pokemon ID between 1 and 898
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
      .then((response) => {
        setRandomPokemon({
          name: response.data.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defence: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="Apps">
        <div className="titleSection">
          <h1>Pokemon Of The Day</h1>
          <NavLink to={"/pokemonInfo"} className={"second"}>
            Search Your Favourite Pokemon Here
          </NavLink>
        </div>
        <div className="displaySection">
          <h1>{randomPokemon.name}</h1>
          <div className="result">
            <div>
              <img src={randomPokemon.img} alt={randomPokemon.name} />
            </div>
            <div>
              <h3>Species : {randomPokemon.species}</h3>
              <h3>Type : {randomPokemon.type}</h3>
              <h4>HP: {randomPokemon.hp}</h4>
              <h4>Attack: {randomPokemon.attack}</h4>
              <h4>Defence: {randomPokemon.defence}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RandomPokemonPage;
