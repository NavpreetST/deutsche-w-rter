import React, { useState } from 'react';
import './WordCard.css';

const WordCard = ({ word, meaning, artikel, plural }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealClick = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="word-card">
      <div className="word-card-content">
        <h2 className="word-card-title">{word}</h2>
        {isRevealed && (
          <div className="word-card-details">
            <p><strong>Meaning:</strong> {meaning}</p>
            <p><strong>Article:</strong> {artikel}</p>
            <p><strong>Plural:</strong> {plural}</p>
          </div>
        )}
      </div>
      <button className="reveal-button" onClick={handleRevealClick}>
        {isRevealed ? 'Hide' : 'Reveal'}
      </button>
    </div>
  );
};

export default WordCard;
