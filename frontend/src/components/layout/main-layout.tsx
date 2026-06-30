import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";
import { useEffect, useState } from "react";
import type { Theme } from "../../types/theme";
import { useTranslation } from "react-i18next";
import NoisyBackground from "../background/noisy-background";
import Rain from "../animations/rain/rain";
import Wave from "../animations/wave/wave";
import Feathers from "../animations/feathers/feathers";
import ChessBoard from "../animations/chessboard/chessboard";
import "./main-layout.css";
import { useWindowWidth } from "../../hooks/useWindowWidth";

export default function MainLayout() {
  const [theme, setTheme] = useState<Theme>("default");
  const [isAnimationOn, setIsAnimationOn] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("en");
  const width = useWindowWidth();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <>
      <NoisyBackground />

      {(theme === "default" || theme === "gray") && isAnimationOn && (
        <Rain upwards={theme !== "gray"} amount={width > 850 ? 150 : 50} />
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
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
