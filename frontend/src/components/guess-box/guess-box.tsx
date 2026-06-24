import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import type { Afflatus } from "../../types/afflatus";
import type { Dmg } from "../../types/dmg";
import type { GuessResult } from "../../types/guessResult";
import type { Race } from "../../types/race";
import type { Rarity } from "../../types/rarity";
import "./guess-box.css"

interface GuessBoxProps {
  slug?: string;
  name?: string;
  version?: number;
  rarity?: Rarity;
  afflatus?: Afflatus;
  dmgType?: Dmg;
  race?: Race;
  guessResult?: GuessResult;
}

export default function GuessBox({
  slug = "",
  name = "",
  version = 1,
  rarity = 2,
  afflatus = "Star",
  dmgType = "Mental",
  race = "Arcanist",
  guessResult = [true, true, false, false, false],
}: GuessBoxProps) {
  const renderArrow = (value: "higher" | "lower" | true) => {
    if (value === "higher") return <FaArrowUp />;
    if (value === "lower") return <FaArrowDown />;
    return null;
  };

  const getComparisonClass = (value: "higher" | "lower" | true) => {
    return value === true ? "correct" : "partial";
  };

  return (
    <div className="guess-container">
      <div
        className={`guess-character ${guessResult.every((value) => value === true) ? "correct" : "incorrect"}`}
      >
        <img src={`/icons/${slug}.webp`} alt={slug} className="guess-image" />
        <span>{name}</span>
      </div>

      <div className={`guess-cell ${getComparisonClass(guessResult[0])}`}>
        <span>{version}</span>
        {renderArrow(guessResult[0])}
      </div>

      <div className={`guess-cell ${getComparisonClass(guessResult[1])}`}>
        <span>{rarity}</span>
        {renderArrow(guessResult[1])}
      </div>

      <div className={`guess-cell ${guessResult[2] ? "correct" : "incorrect"}`}>
        {afflatus}
      </div>

      <div className={`guess-cell ${guessResult[3] ? "correct" : "incorrect"}`}>
        {dmgType}
      </div>

      <div className={`guess-cell ${guessResult[4] ? "correct" : "incorrect"}`}>
        {race}
      </div>
    </div>
  );
}
