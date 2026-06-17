from fastapi import FastAPI
from datetime import date
import random
from psycopg.rows import dict_row
from database import conn
from schemas import SlugInput

app = FastAPI()

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
        "name": [guess_char["name"], True if guess_char["name"] == daily_char["name"] else False],
        "rarity": [guess_char["rarity"], "Higher" if guess_char["rarity"] < daily_char["rarity"] 
                   else "Lower" if guess_char["rarity"] > daily_char["rarity"] else True],
        "afflatus": [guess_char["afflatus"], True if guess_char["afflatus"] == daily_char["afflatus"] else False],
        "dmg_type": [guess_char["dmg_type"], True if guess_char["dmg_type"] == daily_char["dmg_type"] else False],
        "race": [guess_char["race"], True if guess_char["race"] == daily_char["race"] else False],
        "version": [guess_char["version"], "Higher" if guess_char["version"] < daily_char["version"] 
                   else "Lower" if guess_char["version"] > daily_char["version"] else True],
    }