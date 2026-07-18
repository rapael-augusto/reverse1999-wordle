import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR.parent / "data" / "characters.json"
OUTPUT_FILE = BASE_DIR / "seed.sql"


def escape_sql(value: str) -> str:
    return value.replace("'", "''")


with open(DATA_FILE, "r", encoding="utf-8") as f:
    characters = json.load(f)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("-- Automatically generated file.\n")
    f.write(
        "INSERT INTO characters "
        "(name, slug, rarity, afflatus, dmg_type, race, version)\n"
        "VALUES\n"
    )

    values = []

    for c in characters:
        values.append(
            "("
            f"'{escape_sql(c['name'])}', "
            f"'{escape_sql(c['slug'])}', "
            f"{c['rarity']}, "
            f"'{escape_sql(c['afflatus'])}', "
            f"'{escape_sql(c['dmg_type'])}', "
            f"'{escape_sql(c['race'])}', "
            f"{c['version']}"
            ")"
        )

    f.write(",\n".join(values))
    f.write("\n")

    f.write(
        """
ON CONFLICT (slug) DO NOTHING;
"""
    )