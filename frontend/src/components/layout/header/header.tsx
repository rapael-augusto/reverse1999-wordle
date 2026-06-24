import { useState } from "react";
import type { Theme } from "../../../types/theme";
import { useTranslation } from "react-i18next";
import { FaQuestion } from "react-icons/fa";
import HowToPlay from "../../modals/how-to-play";
import { MdBarChart } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import "./header.css"

interface HeaderProps {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setIsAnimationOn: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimationOn: boolean;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  language: string;
}

export default function Header({
  setTheme,
  setIsAnimationOn,
  isAnimationOn = true,
  setLanguage,
  language,
}: HeaderProps) {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isHtpModalOpen, setIsHtpModalOpen] = useState(false);
  const { t } = useTranslation();

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const openThemeDropdown = () => {
    setIsSettingsDropdownOpen(false);
    setIsThemeDropdownOpen((prev) => !prev);
  };

  const openSettingsDropdown = () => {
    setIsThemeDropdownOpen(false);
    setIsSettingsDropdownOpen((prev) => !prev);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="header-main-wrapper">
      <div className="header-title-wrapper">
        <p className="header-title">
          Reverse: 1999 <span>Wordle</span>
        </p>
      </div>
      <div className="header-button-wrapper">
        <div className="how-to-play-dropdown-wrapper">
          <button
            title={t("header.howToPlay")}
            onClick={() => setIsHtpModalOpen(!isHtpModalOpen)}
          >
            <FaQuestion />
          </button>
          {isHtpModalOpen && (
            <HowToPlay onClose={() => setIsHtpModalOpen(false)} />
          )}
        </div>
        <button title={t("header.statistics")}>
          <MdBarChart />
        </button>
        <button title={t("header.themes")} onClick={openThemeDropdown}>
          <IoMoon />
        </button>
        <div className="dropdown-wrapper">
          <button title={t("header.settings")} onClick={openSettingsDropdown}>
            <IoMdSettings />
          </button>
          {isSettingsDropdownOpen && (
            <div className="settings-dropdown">
              <div className="switch-wrapper">
                <p>
                  {t("header.dropdowns.settings.animations")}{" "}
                  {isAnimationOn
                    ? t("header.dropdowns.settings.on")
                    : t("header.dropdowns.settings.off")}
                </p>
                <label className="switch">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={isAnimationOn}
                    onChange={() => setIsAnimationOn(!isAnimationOn)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="select-wrapper">
                <p>{t("header.dropdowns.settings.language")}:</p>
                <select
                  name="language"
                  onChange={handleLanguageChange}
                  value={language}
                >
                  <option value={"en"}>English</option>
                  <option value={"pt"}>Português</option>
                </select>
              </div>
            </div>
          )}
          {isThemeDropdownOpen && (
            <div className="theme-dropdown">
              <button onClick={() => changeTheme("default")}>
                {t("header.dropdowns.themes.default")}
              </button>
              <button onClick={() => changeTheme("blue")}>
                {t("header.dropdowns.themes.blue")}
              </button>
              <button onClick={() => changeTheme("white")}>
                {t("header.dropdowns.themes.white")}
              </button>
              <button onClick={() => changeTheme("gray")}>
                {t("header.dropdowns.themes.gray")}
              </button>
              <button onClick={() => changeTheme("red")}>
                {t("header.dropdowns.themes.red")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
