import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./nav.css";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="mode-navigation-wrapper">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "unactive")}
      >
        {t("nav.daily")}
      </NavLink>
      <NavLink
        to="/unlimited"
        className={({ isActive }) => (isActive ? "active" : "unactive")}
      >
        {t("nav.unlimited")}
      </NavLink>
      <NavLink
        to="/all-characters"
        className={({ isActive }) => (isActive ? "active" : "unactive")}
      >
        {t("nav.allCharacters")}
      </NavLink>
    </nav>
  );
}
