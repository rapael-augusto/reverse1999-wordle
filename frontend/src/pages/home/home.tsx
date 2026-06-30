import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";
import GuessBox from "../../components/guess-box/guess-box";
import "./home.css";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import Navbar from "../../components/layout/nav/nav";
import { useEffect, useMemo, useRef, useState } from "react";
import { CharacterService } from "../../services/characterService";
import { SyncLoader } from "react-spinners";
import type { CharacterGuess } from "../../types/characterGuess";
import confetti from "canvas-confetti";
import WinnerModal from "../../components/modals/winner/winner";

const characterService = new CharacterService();

export interface Character {
  name: string;
  slug: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterSearch, setCharacterSearch] = useState("");
  const [characterGuesses, setCharacterGuesses] = useState<CharacterGuess[]>(
    [],
  );
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const width = useWindowWidth();
  const { t } = useTranslation();
  const legend =
    width > 850
      ? [
          t("guess.character"),
          t("guess.version"),
          t("guess.rarity"),
          t("guess.afflatus"),
          t("guess.damageType"),
          t("guess.race"),
        ]
      : [
          `${t("guess.character")} / ${t("guess.afflatus")}`,
          `${t("guess.version")} / ${t("guess.damageType")}`,
          `${t("guess.rarity")} / ${t("guess.race")}`,
        ];

  const filteredCharacters = useMemo(() => {
    const query = characterSearch.toLowerCase();
    const guessedSlugs = characterGuesses.map((c) => c.guessResult.name.value);
    const list = characters.filter(
      (item) =>
        item.name.toLowerCase().startsWith(query) &&
        !guessedSlugs.includes(item.name),
    );

    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [characters, characterSearch, characterGuesses]);

  const getToday = () => new Date().toISOString().split("T")[0];

  const showWinnerModal = () => {
    const lastShown = localStorage.getItem("winner-modal-date");
    if (lastShown !== getToday()) {
      setTimeout(() => {
        setIsWinModalOpen(true);
      }, 2000);
    }
  };

  const handleCloseWinnerModal = () => {
    localStorage.setItem("winner-modal-date", getToday());
    setIsWinModalOpen(false);
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      angle: 60,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      particleCount: 80,
      angle: 120,
      origin: { x: 1, y: 0.7 },
    });
  };

  const handleGuessAppend = async (guess: string) => {
    try {
      const guessResult = await characterService.dailyGuess(guess);
      const allCorrect =
        guessResult.name.correct &&
        guessResult.afflatus.correct &&
        guessResult.dmg_type.correct &&
        guessResult.race.correct &&
        guessResult.rarity.comparison === true &&
        guessResult.version.comparison === true;
      if (allCorrect) {
        showWinnerModal();
        handleCelebrate();
        setIsFinished(true);
      }
      const newGuess: CharacterGuess = { slug: guess, guessResult };
      setCharacterGuesses((prev) => [newGuess, ...prev]);
    } catch (e) {
      setError("Failed to send guess...");
      console.log(e);
    } finally {
      setCharacterSearch("");
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await characterService.getAllCharactersNames();
        setCharacters(data);
      } catch (e) {
        setError("Failed to load...");
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="special-status-container">
        <SyncLoader
          color="var(--primary-color)"
          loading
          size={35}
          margin={10}
        />
        <p style={{ color: "#262626" }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="special-status-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {isWinModalOpen && (
        <WinnerModal
          character={{
            slug: characterGuesses[0].slug,
            name: characterGuesses[0].guessResult.name.value,
          }}
          onClose={handleCloseWinnerModal}
        />
      )}
      <Navbar />
      <div className="search-wrapper" ref={wrapperRef}>
        <IoSearchOutline />
        <input
          className="input-character"
          type="text"
          placeholder={
            isFinished
              ? t("input.placeholderTrue")
              : t("input.placeholderFalse")
          }
          value={characterSearch}
          onChange={(e) => setCharacterSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          disabled={isFinished}
        />
        {isFocused && characterSearch.length > 0 && (
          <div className="search-dropdown">
            {filteredCharacters.length > 0 ? (
              filteredCharacters.map((c) => (
                <button
                  className="search-select"
                  key={c.slug}
                  onClick={() => {
                    handleGuessAppend(c.slug);
                  }}
                >
                  <img src={`/icons/${c.slug}.webp`} alt={c.slug} />
                  <p>{c.name}</p>
                </button>
              ))
            ) : (
              <div className="search-select">
                <p>No character found...</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="guess-wrapper">
        <div className="guess-header">
          {legend.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        {characterGuesses &&
          characterGuesses.length > 0 &&
          characterGuesses.map((c) => (
            <GuessBox
              key={c.slug}
              slug={c.slug}
              guessResult={c.guessResult}
              lastAnimation={c.slug === characterGuesses[0].slug ? true : false}
            />
          ))}
      </div>
      <div className="guess-legend">
        <div className="legend-item">
          <span className="legend-color correct" />
          {t("guess.correct")}
        </div>
        <div className="legend-item">
          <span className="legend-color partial" />
          {t("guess.partial")}
        </div>
        <div className="legend-item">
          <span className="legend-color incorrect" />
          {t("guess.wrong")}
        </div>
      </div>
    </>
  );
}
