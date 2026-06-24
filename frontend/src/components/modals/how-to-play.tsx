import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import GuessBox from "../guess-box/guess-box";
import "./how-to-play.css"

interface HowToPlayModalProps {
  onClose: () => void;
}

export default function HowToPlay({ onClose }: HowToPlayModalProps) {
  const { t } = useTranslation();

  return createPortal(
    <div className="how-to-play-overlay" onClick={onClose}>
      <div
        className="how-to-play-dropdown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="how-to-play-header">
          <h2>{t("header.howToPlay")}</h2>
          <button className="close-modal" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <section>
          <h3>{t("hptModal.basics")}</h3>
          <p style={{ marginBottom: "1rem" }}>{t("htpModal.line1")}</p>
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
          {Array.from({ length: 6 }, (_, index) => {
            const value = index + 2;
            return <p>{t(`htpModal.line${value}`)}</p>;
          })}
        </section>
        <section>
          <h3>{t("htpModal.notes")}</h3>
          <ul>
            {Array.from({ length: 3 }, (_, index) => {
              return <li>{t(`htpModal.list${index + 1}`)}</li>;
            })}
          </ul>
        </section>
      </div>
    </div>,
    document.body,
  );
}
