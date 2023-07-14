import { useEffect, useState } from "react";
import { trpc } from "../trpc/client";

export function SearchComponent() {
  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [autoSuggestion, setAutoSuggestion] = useState<string[]>([""]);

  const useQuery = trpc.pokemonAuto.suggestRec.useQuery(inputTerm);
  const handleInput = (event) => {
    event.stopPropagation();
    setInputTerm(event.target.value);
    if (event.target.value.length > 2) setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (useQuery.data !== undefined) setAutoSuggestion(useQuery.data);
    if (inputTerm.length < 2) setSearchTerm("");
  }, [useQuery]);

  return (
    <div className="search_container">
      <div>
        <input
          type="search"
          value={inputTerm}
          placeholder="Pikachu etc."
          onInput={handleInput}
        />
      </div>
      <div className="rec_container">
        <div className="recs">
          {searchTerm.length > 2 &&
            autoSuggestion?.length > 0 &&
            autoSuggestion.map((pokemonsRec) => (
              <div
                key={pokemonsRec}
                className="rec_item"
                onClick={() => setInputTerm(pokemonsRec)}
              >
                {pokemonsRec}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
