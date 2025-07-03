import React from 'react';
import './App.css';
import WordList from './components/WordList/WordList';
// import WordList from './components/WordList/WordListApi';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Deutsch Word</h1>
      </header>
      <main>
        <WordList />
      </main>
    </div>
  );
}

export default App;
