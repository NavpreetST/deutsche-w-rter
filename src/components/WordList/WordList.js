import React, { useState, useEffect, useCallback } from 'react';
import WordCard from '../WordCard/WordCard';
import './WordList.css';

const WordList = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/words/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWords(data);
    } catch (err) {
      console.error("Error fetching words:", err);
      setError('Failed to load words. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  if (loading) {
    return <div className="word-list-container">Loading words...</div>;
  }
  if (error) {
    return <div className="word-list-container" style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="word-list-container">
      <div className="word-list-header">
        <button className="new-words-button" onClick={fetchWords}>
          New Words
        </button>
      </div>
      <div className="word-list-grid">
        {words.length > 0 ? (
          words.map(word => (
            <WordCard
              key={word.id}
              word={word.word}
              meaning={word.meaning}
              artikel={word.artikel}
              plural={word.plural}
            />
          ))
        ) : (
          <p>No words found. Try fetching new words.</p>
        )}
      </div>
    </div>
  );
};

export default WordList;
