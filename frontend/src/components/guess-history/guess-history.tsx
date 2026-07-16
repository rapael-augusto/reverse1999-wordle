import { useTranslation } from "react-i18next";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import type { CharacterGuess } from "../../types/characterGuess";
import GuessBox from "../guess-box/guess-box";
import "./guess-history.css";

interface GuessHistoryProps {
  guessedCharacters: CharacterGuess[];
}

export default function GuessHistory({ guessedCharacters }: GuessHistoryProps) {
  const { t } = useTranslation();
  const width = useWindowWidth();
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

  return guessedCharacters && guessedCharacters.length > 0 ? (
    <div className="guess-wrapper">
      <div className="guess-header">
        {legend.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      {guessedCharacters.map((c) => (
        <GuessBox
          key={c.slug}
          slug={c.slug}
          guessResult={c.guessResult}
          lastAnimation={c.slug === guessedCharacters[0].slug}
        />
      ))}
    </div>
  ) : null;
}
