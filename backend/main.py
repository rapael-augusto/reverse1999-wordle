from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
import random
from psycopg.rows import dict_row
from database import conn
from schemas import SlugInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

characters = []

with conn.cursor(row_factory=dict_row) as cur:
    cur.execute("SELECT * FROM characters")
    characters = cur.fetchall()

random.seed(37)
random.shuffle(characters)

def get_daily_char():
    return characters[date.today().toordinal()%len(characters)]

@app.get("/characters")
def get_all_characters():
    return [{
        "name": c["name"],
        "slug": c["slug"]
    } for c in characters ]

@app.get("/characters/{slug}")
def get_specific_character(slug: str):
    specific_char = next((c for c in characters if c["slug"] == slug), None)

    if not specific_char: 
        return None
    
    return {
        "name": specific_char["name"],
        "rarity": specific_char["rarity"],
        "afflatus": specific_char["afflatus"],
        "dmg_type": specific_char["dmg_type"],
        "race": specific_char["race"],
        "version": specific_char["version"]
    }

@app.post("/guess")
def guess_attempt(input: SlugInput):
    guess_char = next((c for c in characters if c["slug"] == input.slug), None)
    daily_char = get_daily_char()

    if not guess_char:
        return None

    return {
        "name": {
            "value": guess_char["name"],
            "correct": guess_char["name"] == daily_char["name"],
        },
        "rarity": {
            "value": guess_char["rarity"],
            "comparison":
                "Higher" if guess_char["rarity"] < daily_char["rarity"]
                else "Lower" if guess_char["rarity"] > daily_char["rarity"]
                else True,
        },
        "afflatus": {
            "value": guess_char["afflatus"],
            "correct": guess_char["afflatus"] == daily_char["afflatus"],
        },
        "dmg_type": {
            "value": guess_char["dmg_type"],
            "correct": guess_char["dmg_type"] == daily_char["dmg_type"],
        },
        "race": {
            "value": guess_char["race"],
            "correct": guess_char["race"] == daily_char["race"],
        },
        "version": {
            "value": guess_char["version"],
            "comparison":
                "Higher" if guess_char["version"] < daily_char["version"]
                else "Lower" if guess_char["version"] > daily_char["version"]
                else True,
        },
    }