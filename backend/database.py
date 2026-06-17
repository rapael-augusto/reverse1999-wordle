import psycopg
import os

from dotenv import load_dotenv

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

conn = psycopg.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD)