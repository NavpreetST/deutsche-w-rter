import React, { useState, useEffect, useCallback } from 'react';
import WordCard from '../WordCard/WordCard';
import './WordList.css';
// import getRandomWords from "/server/server.js"
const mockData = [
  { "id": 1, "word": "Haus", "meaning": "House", "artikel": "das", "plural": "Häuser" },
  { "id": 2, "word": "Auto", "meaning": "Car", "artikel": "das", "plural": "Autos" },
  { "id": 3, "word": "Stuhl", "meaning": "Chair", "artikel": "der", "plural": "Stühle" },
  { "id": 4, "word": "Tisch", "meaning": "Table", "artikel": "der", "plural": "Tische" },
  { "id": 5, "word": "Fenster", "meaning": "Window", "artikel": "das", "plural": "Fenster" },
  { "id": 6, "word": "Tür", "meaning": "Door", "artikel": "die", "plural": "Türen" },
  { "id": 7, "word": "Lampe", "meaning": "Lamp", "artikel": "die", "plural": "Lampen" },
  { "id": 8, "word": "Bett", "meaning": "Bed", "artikel": "das", "plural": "Betten" },
  { "id": 9, "word": "Buch", "meaning": "Book", "artikel": "das", "plural": "Bücher" },
  { "id": 10, "word": "Tasse", "meaning": "Cup", "artikel": "die", "plural": "Tassen" }
];

const WordList = () => {
  const [words, setWords] = useState([]);

  const fetchWords = useCallback(() => {
    // Simulate fetching 5 random words
    const randomWords = [...mockData].sort(() => 0.5 - Math.random()).slice(0, 5);
    setWords(randomWords);
  }, []);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  return (
    <div className="word-list-container">
      <div className="word-list-header">
        <button className="new-words-button" onClick={fetchWords}>
          New Words
        </button>
      </div>
      <div className="word-list-grid">
        {words.map(word => (
          <WordCard
            key={word.id}
            word={word.word}
            meaning={word.meaning}
            artikel={word.artikel}
            plural={word.plural}
          />
        ))}
      </div>
    </div>
  );
};

export default WordList;
