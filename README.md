# Deutsch-Word: German Word Learning Application

## Project Description
Deutsch-Word is an interactive web application designed to help users learn German vocabulary. It presents German words along with their English translations, allowing users to practice and test their knowledge. The application features a React-based frontend and a Node.js backend that serves the vocabulary data.

## Features
- **Interactive Word Cards**: Displays German words and their English translations.
- **Vocabulary Practice**: Helps users memorize words through repeated exposure.
- **Backend API**: A simple Node.js server to provide word data.
- **Responsive Design**: (Assuming this is a goal or existing feature) User-friendly interface across different devices.

## Technologies Used
### Frontend
- React.js
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- JSON for data storage

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Deutsch-Word.git
cd Deutsch-Word
```

### 2. Backend Setup
Navigate to the `server` directory, install dependencies, and start the server.
```bash
cd server
npm install
node server.js
```
The backend server will typically run on `http://localhost:5000` (or another port specified in `server.js`).

### 3. Frontend Setup
Open a new terminal, navigate back to the root directory of the project, install dependencies, and start the React development server.
```bash
cd .. # Go back to the root directory if you are in the server directory
npm install
npm start
```
The frontend application will typically open in your browser at `http://localhost:3000`.

## Project Structure
```
Deutsch-Word/
├── .git/
├── node_modules/
├── public/                 # Static assets for the frontend (e.g., index.html, favicon)
├── server/                 # Backend Node.js application
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js           # Main backend server file
│   └── words.json          # JSON file containing German words and translations
├── src/                    # Frontend React application source code
│   ├── components/         # Reusable React components
│   │   ├── WordCard/
│   │   │   ├── WordCard.css
│   │   │   ├── WordCard.js
│   │   │   └── WordCard.md
│   │   └── WordList/
│   │       ├── WordList.css
│   │       ├── WordList.js
│   │       └── WordListApi.js
│   ├── App.js              # Main application component
│   ├── App.css
│   ├── index.js            # Entry point for the React app
│   ├── index.css
│   └── ... (other React files)
├── .gitignore
├── package.json            # Frontend dependencies
├── package-lock.json
└── README.md               # This file
```

## Contributing
Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details. (Note: A LICENSE.md file does not currently exist in the provided directory structure. You may want to create one..)
