# Guide: Implementing Random Word Selection in Your Express Backend

This guide will walk you through modifying your `server.js` file to read words from `words.json`, select 5 random words, and send them as a JSON response to your frontend.

---

## Goal

To enhance your `/api/words/random` endpoint so it dynamically serves 5 unique random German words from your `words.json` file.

---

## Prerequisites

Before you start, ensure you have:
*   Your `server.js` file set up with Express.
*   Your `words.json` file located in the same `server` directory, containing an array of word objects.

---

## Step 1: Import Necessary Modules

To read files from your server, you'll need Node.js's built-in `fs` (File System) module and `path` module to handle file paths correctly.

Add these lines at the top of your `server.js` file, along with your existing `express` import:

```javascript
const express = require('express');
const fs = require('fs'); // For reading files
const path = require('path'); // For handling file paths
```

*   **`fs` module:** Provides methods for interacting with the file system. We'll use `fs.readFile` to read `words.json`.
*   **`path` module:** Provides utilities for working with file and directory paths. `path.join(__dirname, 'words.json')` helps construct an absolute path to your `words.json` file, ensuring it works correctly regardless of where your script is executed from.

---

## Step 2: Load the `words.json` Data

You should load your `words.json` data once when your server starts, not every time an API endpoint is hit. This is more efficient as file I/O can be slow.

Declare a variable to hold your words and then use `fs.readFile` to load the data. Place this code after your `PORT` definition.

```javascript
// ... (existing imports and app/PORT setup) ...

let words = []; // This array will hold your German words

// Load words from words.json when the server starts
fs.readFile(path.join(__dirname, 'words.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading words.json:', err);
        return; // Stop execution if there's an error reading the file
    }
    try {
        words = JSON.parse(data); // Parse the JSON data into the 'words' array
        console.log('Words loaded successfully.');
    } catch (parseErr) {
        console.error('Error parsing words.json:', parseErr); // Handle JSON parsing errors
    }
});

// ... (rest of your server.js code) ...
```

*   **`let words = [];`**: Initializes an empty array that will store your word data. Using `let` allows you to reassign it once the data is loaded.
*   **`fs.readFile(...)`**: This asynchronous function reads the content of `words.json`.
    *   `path.join(__dirname, 'words.json')`: Constructs the full path to your `words.json` file. `__dirname` is a Node.js global variable that gives you the absolute path of the directory containing the currently executing file (`server.js`).
    *   `'utf8'`: Specifies the encoding for the file.
    *   `(err, data) => { ... }`: This is the callback function that runs once the file has been read (or an error occurs).
        *   `if (err)`: Checks for any errors during file reading (e.g., file not found).
        *   `JSON.parse(data)`: Converts the JSON string content read from the file into a JavaScript array of objects.
        *   `try...catch`: Essential for handling potential errors if the `words.json` file is not valid JSON.

---

## Step 3: Implement `getRandomWords` Function

Now, create a helper function that will take a `count` as an argument and return that many random, unique words from your `words` array.

Add this function after the `fs.readFile` block:

```javascript
// ... (existing code including fs.readFile) ...

// Function to get a specified number of random words
const getRandomWords = (count) => {
    if (words.length === 0) {
        return []; // Return empty array if no words are loaded
    }

    // Create a shallow copy of the words array to avoid modifying the original
    const shuffled = [...words].sort(() => 0.5 - Math.random());

    // Return the first 'count' elements from the shuffled array
    return shuffled.slice(0, count);
};

// ... (rest of your server.js code) ...
```

*   **`if (words.length === 0)`**: A safety check to ensure you don't try to pick words from an empty array.
*   **`[...words]`**: This creates a *shallow copy* of your `words` array. It's crucial to work on a copy so you don't permanently reorder your original `words` data.
*   **`.sort(() => 0.5 - Math.random())`**: This is a common JavaScript trick to shuffle an array randomly.
    *   `Math.random()`: Returns a floating-point, pseudo-random number in the range `[0, 1)`.
    *   `0.5 - Math.random()`: This expression will produce a random number between -0.5 and 0.5. When used in `sort()`, it causes elements to be randomly ordered.
*   **`.slice(0, count)`**: This method returns a new array containing elements from the original array starting from index 0 up to (but not including) the `count` index. This effectively gives you the first `count` random words.

---

## Step 4: Update the API Endpoint

Finally, modify your `/api/words/random` endpoint to use the `getRandomWords` function and send the result to the frontend.

Locate your existing `app.get('/api/words/random', ...)` block and update it:

```javascript
// ... (existing code including getRandomWords function) ...

app.get('/api/words/random', (req, res) => {
    const randomWords = getRandomWords(5); // Call the function to get 5 random words
    res.json(randomWords); // Send the array of random words as a JSON response
});

// ... (rest of your server.js code, including app.listen) ...
```

*   **`const randomWords = getRandomWords(5);`**: Calls your newly created function, requesting 5 random words.
*   **`res.json(randomWords);`**: Sends the `randomWords` array back to the client as a JSON response. The frontend will receive this array and can then use it to display the words.

---

## Full `server.js` Example

After all the changes, your `server.js` file should look similar to this:

```javascript
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
    const randomWords = getRandomWords(5); // Get 5 random words
    res.json(randomWords); // Send the array of random words as a JSON response
});

app.listen(PORT, () => {
    console.log(`Backend server is running http://localhost:${PORT}`);
});
```

---

## Testing Your Backend

1.  **Start your backend server:**
    Open your terminal, navigate to the `server` directory (`cd server`), and run `npm start`. You should see "Words loaded successfully." and "Backend server is running..." messages.
2.  **Test the API endpoint:**
    Open your web browser and go to `http://localhost:5001/api/words/random`. You should now see a JSON array containing 5 random German word objects from your `words.json` file. Each time you refresh, you should get a different set of 5 words.

Once you've successfully implemented and tested this, you can then modify your React frontend to fetch data from this new endpoint instead of using mock data.
