## Backend TODO for WordCard

### API Endpoint

*   **/api/words/random**

### Method

*   `GET`

### Success Response (200)

*   The endpoint should return a JSON array of 5 random word objects. Each object should have the following structure:

```json
[
  {
    "id": 1,
    "word": "Haus",
    "meaning": "House",
    "artikel": "das",
    "plural": "Häuser"
  },
  {
    "id": 2,
    "word": "Auto",
    "meaning": "Car",
    "artikel": "das",
    "plural": "Autos"
  },
  {
    "id": 3,
    "word": "Stuhl",
    "meaning": "Chair",
    "artikel": "der",
    "plural": "Stühle"
  },
  {
    "id": 4,
    "word": "Tisch",
    "meaning": "Table",
    "artikel": "der",
    "plural": "Tische"
  },
  {
    "id": 5,
    "word": "Fenster",
    "meaning": "Window",
    "artikel": "das",
    "plural": "Fenster"
  }
]
```
