import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";
import GuessBox from "../../components/guess-box/guess-box";
import "./home.css";
import { useWindowWidth } from "../../components/hooks/useWindowWidth";
import Navbar from "../../components/layout/nav/nav";

export default function Home() {
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

  return (
    <>
      <Navbar />
      <div className="search-wrapper">
        <IoSearchOutline />
        <input
          className="input-character"
          type="text"
          placeholder={t("input.placeholder")}
        />
      </div>
      <div className="guess-wrapper">
        <div className="guess-header">
          {legend.map((item) => (
            <div>{item}</div>
          ))}
        </div>
        <GuessBox
          slug="liang-yue"
          name="Liang Yue"
          version={2.5}
          rarity={6}
          afflatus="Star"
          dmgType="Reality"
          race="Mixed"
          guessResult={["lower", "lower", true, false, false]}
        />
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
