"use client";

import { fetchAnimals } from "@/util/api";
import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";

interface Animal {
  id: string;
  name: string;
  imageUrl: string;
  breeds: [];
  breads_id: string | number;
  type: string;
}

const Home: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [suggestions, setSuggestions] = useState<Animal[]>([]);

  useEffect(() => {
    const loadAnimals = async () => {
      const fetchedAnimals = await fetchAnimals();
      setAnimals(fetchedAnimals.sort(() => Math.random() - 0.5));
      setFilteredAnimals(fetchedAnimals); 
    };

    loadAnimals();
  }, []);

  useEffect(() => {
    const results = animals.filter((animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnimals(results); 
    setSuggestions(results);
  }, [searchTerm, animals]);

  const handleSelectSuggestion = (suggestion: Animal) => {
    setSearchTerm(suggestion.name);
    setFilteredAnimals([suggestion]); 
    setSuggestions([]); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSuggestions([]); 
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8"> 
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search for a breed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleBlur} 
          onKeyDown={handleKeyDown}
          className="w-full p-2 rounded-lg border border-gray-300"
        />
        {searchTerm.length > 0 && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <PetCard
            key={animal.id}
            name={animal.name}
            imageUrl={animal?.imageUrl || ""}
            id={animal.id}
            breads_id={animal.breads_id}
            type={animal.type}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
