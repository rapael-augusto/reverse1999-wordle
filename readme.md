
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
A wordle-like game using Reverse: 1999 characters. Created as a study project on python, sql and react.

The concept is pretty simple, using a pseudo-random shuffle, every day there's a differente character chosen from a database in postgree, you can take guesses and get hints about specific characteristics such as afflatus, version, etc, if it's right, wrong, higher, or lower. Each guess is supposed to get you closer to today's character, good luck!

## Currant State of the Project:
Initial fase, currently in development, here's what's done so far:
* Initial **backend** structure with **python**;
* Initial **api endpoins** using **fastAPI**;
* Integration with local **postgree** database;

---

## Tecnologies Used:

### Backend:
* Python;
* FastAPI and other minor libraries;
* PostgreSQL;

### Frontend:
* None for a while, stay tuned...

### Tools and Good Pratices:
* Git;
* GitHub;
* Conventional Commits;

## Endpoint Map:

The API url base is `http://127.0.0.1:8000/`. All endpoints are listed below.

### Characters — `/characters`

| Method | Endpoint | Description | Autentication |
|--------|----------|-------------|---------------|
| `GET` | `/characters` | Returns all characters | No |
| `GET` | `/characters/{slug}` | Returns a specific character | No |

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
	},
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

**Note:** The definition of "slug" in this case is the lowercase name of the caracter without any accent or punction, and any space is changed for a "-". Example: Ms. New Babel -> ms-new-babel

### Daily Guess — `/guess`

| Method | Endpoint | Description | Autentication |
|--------|----------|-------------|---------------|
| `POST` | `/guess` | Returns an array with hints for the daily character | No |

**Body of `/guess`:**
```json
{
	"slug": "liang-yue"
}
```

**Response of `/guess`:**
```json
{
	"name": [
		"Liang Yue",
		false
	],
	"rarity": [
		6,
		true
	],
	"afflatus": [
		"Star",
		false
	],
	"dmg_type": [
		"Reality",
		false
	],
	"race": [
		"Mixed",
		false
	],
	"version": [
		2.5,
		"Lower"
	]
}
```

## Contribuiting:
* **[Raphael Augusto Paulino Leite] (https://github.com/rapael-augusto)**