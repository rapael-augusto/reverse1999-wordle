from database import conn
import json

with open("data/characters.json", "r", encoding="utf-8") as f:
    characters_data = json.load(f)


def create_table():
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS characters (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                slug TEXT UNIQUE NOT NULL,
                rarity INT NOT NULL,
                afflatus TEXT NOT NULL,
                dmg_type TEXT NOT NULL,
                race TEXT NOT NULL,
                version NUMERIC(3,2) NOT NULL
            );
        """)
    conn.commit()


def insert_characters():
    with conn.cursor() as cur:
        for c in characters_data:
            cur.execute("""
                INSERT INTO characters (
                    name,
                    slug,
                    rarity,
                    afflatus,
                    dmg_type,
                    race,
                    version
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (slug) DO NOTHING;
            """, (
                c["name"],
                c["slug"],
                c["rarity"],
                c["afflatus"],
                c["dmg_type"],
                c["race"],
                c["version"]
            ))

    conn.commit()


def main():
    create_table()
    insert_characters()
    print(f"Seed complete: {len(characters_data)} characters inserted.")


if __name__ == "__main__":
    main()