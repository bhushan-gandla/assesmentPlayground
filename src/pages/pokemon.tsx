

// GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0

import { useEffect, useMemo, useState } from "react"
import type { PokemonResults } from "../models/pokemon.models"

const pokemonDetailsUrl = function (name: string){
    return "https://pokeapi.co/api/v2/pokemon/"+`${name}`
}

export default function Pokemon() {
    const [pokemonList, setPokemonList] = useState<PokemonResults[]>([]);
    const [pokemonUrl, setPokemonUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    const [pokemonNextUrl, setPokemonNextUrl] = useState("");
    const [pokemonPreviousUrl, setPokemonPreviousUrl] = useState("");


    const [searchPokemon, setSearchPokemon] = useState("");

    const [error, setError] = useState("");
    const [loadPokemons, setLoadPokemons] = useState(false);

    useEffect(() => {
        async function getPokemonList() {

            try {
                setLoadPokemons(true);
                const response = await fetch(pokemonUrl);

                if (!response.ok) throw new Error("Issue fetching reponse");

                const data = await response.json();

                setPokemonList(data.results);
                setPokemonNextUrl(data.next);
                setPokemonPreviousUrl(data.previous);

            } catch (err) {
                setError("Error while getting pokemons" + err)
            } finally {
                setLoadPokemons(false);
            }
        }

        getPokemonList();
    }, [pokemonUrl]);


    useEffect(() => {
        async function getAllPokemonDetails(){
            try{
                await Promise.all(
                    pokemonList.map(async p => {
                        const response = await fetch (pokemonDetailsUrl(p.name))

                        if (!response.ok) throw new Error("Issue fetching details");

                        const data = await response.json();

                        console.log(data)
                    })
                )

            }catch (err) {
                setError("Error while getting pokemons" + err)
            } finally {
            }

        }

        getAllPokemonDetails();
    }, [pokemonList])


    const filteredPokemons: PokemonResults[] = useMemo(() => {
        return pokemonList.filter(p => {
            const matchedPokemons = p.name.toLowerCase().includes(searchPokemon.toLowerCase())

            return matchedPokemons;
        })
    }, [pokemonList, searchPokemon])



    return (
        <>
            {error && <p>Error fetching pokemons</p>}

            <div className="filter-wrapper">
                <input
                    type="text"
                    placeholder="Search pokemons"
                    value={searchPokemon}
                    onChange={(e) => setSearchPokemon(e.target.value)}
                />
            </div>
            {filteredPokemons.length === 0 ? (
                <p>No pokemons found</p>
            ) : (
                <ul className="pokemon-list">
                    {filteredPokemons.map((p, i) => (
                        <li key={i}>
                            <a href={p.url}>{p.name}</a>
                        </li>
                    ))}
                </ul>
            )}

            <div className="paginations-wrapper">
                <button 
                    onClick={() => setPokemonUrl(pokemonPreviousUrl)}
                    disabled={pokemonPreviousUrl ? false: true}
                >Previous</button>
                <button onClick={() => setPokemonUrl(pokemonNextUrl)}>Next</button>
            </div>

        </>
    )
}