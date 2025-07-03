const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 5001;

let words = [];

// Load words from words.json when the server starts
fs.readFile(path.join(__dirname, 'words.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading words.json:', err);
        return;
    }
    try {
        words = JSON.parse(data);
        console.log('Words loaded successfully.');

        // Start the server ONLY after words are loaded
        app.listen(PORT, () => {
            console.log(`Backend server is running http://localhost:${PORT}`);
        });

    } catch (parseErr) {
        console.error('Error parsing words.json:', parseErr);
    }
});

// Function to get a specified number of random words
const getRandomWords = (count) => {
    if (words.length === 0) {
        return [];
    }
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

app.get('/api/words/random', (req, res) => {
    const randomWords = getRandomWords(5);
    res.json(randomWords);
});