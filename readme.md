## Reverse: 1999 Wordle

---

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571.svg?style=for-the-badge&logo=fastapi)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Description:

A Wordle-inspired guessing game based on Reverse: 1999 characters, featuring deterministic daily challenges and attribute-based comparison mechanics.

The concept: using a deterministic shuffle with a fixed seed to ensure reproducible ordering, every day there's a different character chosen from a database in postgreSQL, you can take guesses and get hints about specific characteristics such as afflatus, version, etc, if it's right, wrong, higher, or lower. Each guess is supposed to get you closer to today's character, good luck!

## Architecture

The project follows a client-server architecture.

### Components

- **Frontend (React)**  
  Handles UI rendering, user input, and game interaction. Communicates with the backend via REST API.
- **Backend (FastAPI)**  
  Provides REST endpoints, handles game logic, and manages the daily character selection system.
- **Database (PostgreSQL)**  
  Stores the character dataset used by the game.

### Data Flow

1. The frontend sends requests (e.g., character guesses) to the backend.
2. The backend retrieves or processes data using the in-memory dataset.
3. The backend applies game logic (comparison between guessed and daily character).
4. The response is returned as JSON to the frontend.
5. The frontend updates the UI based on the response.

### Architecture Overview

User → React Frontend → FastAPI Backend → PostgreSQL / In-memory Data → FastAPI → React Frontend

---

## Current Project State

The project is currently in a functional MVP stage.

### Backend

- Fully functional REST API built with FastAPI;
- Character dataset loaded from PostgreSQL database;
- Deterministic daily character system based on date;
- Complete game logic for daily character guessing (attribute comparison system);
- Endpoints for retrieving characters and submitting guesses;

### Frontend

- Initial React application structure implemented;
- Static UI for game interface;
- Responsive layout and component-based structure;

### Database

- PostgreSQL database integrated with backend;
- Character dataset successfully loaded into memory on startup;

---

## Technologies Used

### Backend

- Python;
- FastAPI;
- PostgreSQL;

### Frontend

- React;
- TypeScript;
- React Router;
- i18next (internationalization);
- CSS3;

### Dev Tools

- Vite;
- ESLint;
- Prettier;

### Development Practices

- Git & GitHub;
- Conventional Commits;
- Clean Code principles;

## Endpoint Map:

The API url base is `http://127.0.0.1:8000/`. All endpoints are listed below.

### Characters — `/characters`

| Method | Endpoint             | Description                  | Authentication |
| ------ | -------------------- | ---------------------------- | -------------- |
| `GET`  | `/characters`        | Returns all characters       | No             |
| `GET`  | `/characters/{slug}` | Returns a specific character | No             |

**Response of `/characters`:**

```json
[
  {
    "name": "Balloon Party",
    "slug": "balloon-party"
  },
  {
    "name": "La Source",
    "slug": "la-source"
  }
  // more characters...
]
```

**Response of `/characters/{slug}` with an example:**

```json
{
  "name": "Liang Yue",
  "rarity": 6,
  "afflatus": "Star",
  "dmg_type": "Reality",
  "race": "Mixed",
  "version": 2.5
}
```

**Note:** The definition of "slug" in this case is the lowercase name of the character without any accent or punction, and any space is changed for a "-". Example: Ms. New Babel -> ms-new-babel.

### Daily Guess — `/guess`

| Method | Endpoint | Description                                           | Authentication |
| ------ | -------- | ----------------------------------------------------- | -------------- |
| `POST` | `/guess` | Each field returns a tuple: [value, comparisonResult] | No             |

**Body of `/guess`:**

```json
{
  "slug": "liang-yue"
}
```

**Response of `/guess`:**

```json
{
  "name": ["Liang Yue", false],
  "rarity": [6, true],
  "afflatus": ["Star", false],
  "dmg_type": ["Reality", false],
  "race": ["Mixed", false],
  "version": [2.5, "Lower"]
}
```

## How to Run

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL running locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/reverse-1999-wordle.git
cd reverse-1999-wordle
```

### 2. Backend

1. Install dependencies:

```bash
cd backend
python -m venv .venv
```

2. Activate virtual environment:

```bash
.venv\Scripts\activate
```

3. Setup database:

```sql
CREATE DATABASE r1999_wordle;
```

4. Configure your connection in `backend/database.py`

5. Seed database:

```bash
python seed.py
```

6. Run backend (available at http://127.0.0.1:8000):

```bash
uvicorn main:app --reload
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Available at http://localhost:5173

---

## Contributing:

Developed by:

- [Raphael Augusto Paulino Leite](https://github.com/rapael-augusto)
