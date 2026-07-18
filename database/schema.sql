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