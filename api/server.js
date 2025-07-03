const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors for handling cross-origin requests
const app = express();

let words = [];
const wordsFilePath = path.join(__dirname, 'words.json');

// Use an IIFE (Immediately Invoked Function Expression) or a synchronous read for loading words.
// For Vercel serverless functions, synchronous operations at the top level
// are acceptable because they run once per cold start.
try {
    const data = fs.readFileSync(wordsFilePath, 'utf8');
    words = JSON.parse(data);
    console.log('Words loaded successfully.');
} catch (err) {
    console.error('Error loading words.json:', err);
    // In a production environment, you might want to throw an error or handle this more robustly
    // if words.json is critical for your application to function.
}

// Enable CORS for all origins (for development).
// In production, you should restrict this to your frontend's domain.
app.use(cors());

// Function to get a specified number of random words
const getRandomWords = (count) => {
    if (words.length === 0) {
        console.warn('Words array is empty. Cannot retrieve random words.');
        return [];
    }
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

app.get('/api/words/random', (req, res) => {
    const randomWords = getRandomWords(5);
    res.json(randomWords);
});

// The app.listen() call is removed for Vercel production deployment.
// It's still useful for local development, so we can keep it conditionally.
const PORT = process.env.PORT || 5001; // Use process.env.PORT for flexibility

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Backend server is running http://localhost:${PORT}`);
    });
}

// This line is crucial for Vercel. It exports your Express app instance
// so Vercel can use it as a serverless function.
module.exports = app;