import "./App.css";
import type { Theme } from "../types/theme";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NoisyBackground from "../components/background/noisy-background";
import Rain from "../components/animations/rain/rain";
import Wave from "../components/animations/wave/wave";
import Feathers from "../components/animations/feathers/feathers";
import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer/footer";
import ChessBoard from "../components/animations/chessboard/chessboard";
import { IoSearchOutline } from "react-icons/io5";
import GuessBox from "../components/guess-box/guess-box";

export default function App() {
  const [theme, setTheme] = useState<Theme>("default");
  const [isAnimationOn, setIsAnimationOn] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("en");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { t, i18n } = useTranslation();

  const legend =
    windowWidth > 850
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
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  useEffect(() => {
    i18n.changeLanguage(language);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return (
    <>
      <NoisyBackground />

      {(theme === "default" || theme === "gray") && isAnimationOn && (
        <Rain upwards={theme !== "gray"} amount={windowWidth > 850 ? 150 : 50} />
      )}
      {theme === "blue" && isAnimationOn && <Wave />}
      {theme === "red" && isAnimationOn && <Feathers />}

      <div className="wrapper">
        <Header 
          setTheme={setTheme}
          setIsAnimationOn={setIsAnimationOn}
          isAnimationOn={isAnimationOn}
          setLanguage={setLanguage}
          language={language}
        />
        <main className="main-container">
          {theme === "white" && isAnimationOn && <ChessBoard />}
          <nav className="mode-navigation-wrapper">
            <button className="active">{t("nav.daily")}</button>
            <button className="unactive">{t("nav.unlimited")}</button>
            <button className="unactive">{t("nav.allCharacters")}</button>
          </nav>
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
        </main>
        <Footer />
      </div>
    </>
  );
}