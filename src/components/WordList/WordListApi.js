import React, { useState, useEffect, useCallback } from 'react';
import WordCard from '../WordCard/WordCard';
import './WordList.css';

// The backend API endpoint
const API_URL = '/api/words/random';

const WordList = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);     // Add error state

  const fetchWords = useCallback(async () => {
    setLoading(true); // Set loading to true before the fetch
    setError(null);   // Clear any previous errors

    try {
      // Use the fetch API to make a GET request to your backend
      const response = await fetch(API_URL);

      // Check if the response was successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON data from the response
      const data = await response.json();
      
      // Update the state with the words from the backend
      setWords(data);

    } catch (e) {
      // If an error occurs during the fetch, update the error state
      console.error("Failed to fetch words:", e);
      setError("Could not load words. Please make sure the backend server is running.");
    } finally {
      // Set loading to false after the fetch is complete (whether it succeeded or failed)
      setLoading(false);
    }
  }, []); // The dependency array is empty because the function doesn't depend on props or state

  // useEffect now calls the async fetchWords function when the component mounts
  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div className="status-message">Loading words...</div>;
  }
  
  if (error) {
    return <div className="status-message error">{error}</div>;
  }

  return (
    <div className="word-list-container">
      <div className="word-list-header">
        <button className="new-words-button" onClick={fetchWords} disabled={loading}>
          {loading ? 'Loading...' : 'New Words'}
        </button>
      </div>
      <div className="word-list-grid">
        {words.map(word => (
          <WordCard
            key={word.id} // Assuming your words have a unique id
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