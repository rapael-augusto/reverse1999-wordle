import { useTranslation } from "react-i18next";
import './guess-legend.css'

export default function GuessLegend() {
  const { t } = useTranslation();

  return (
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
  );
}
