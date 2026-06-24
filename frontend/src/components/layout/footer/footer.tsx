import { useTranslation } from "react-i18next";
import "./footer.css"

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <p>
        {t("footer.basedOn")}{" "}
        <a href="https://re1999.bluepoch.com/" target="_blank">
          Reverse: 1999
        </a>
        {", "}
        {t("footer.by")} | {t("footer.inspiredBy")}{" "}
        <a href="https://uttu.merui.net/profiles/" target="_blank">
          merui.net
        </a>{" "}
        {t("footer.and")}{" "}
        <a href="https://orvdle.vercel.app/" target="_blank">
          Orvdle
        </a>
        .
      </p>

      <p>{t("footer.madeBy")}</p>
    </footer>
  );
}
