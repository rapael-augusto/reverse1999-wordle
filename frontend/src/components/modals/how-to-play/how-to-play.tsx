import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import "./how-to-play.css";
import GuessBox from "../../guess-box/guess-box";

interface HowToPlayModalProps {
  onClose: () => void;
}

export default function HowToPlayModal({ onClose }: HowToPlayModalProps) {
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
          <h3>{t("htpModal.basics")}</h3>
          <p style={{ marginBottom: "1rem" }}>{t("htpModal.line1")}</p>
          <GuessBox
            slug="liang-yue"
            guessResult={{
              name: {
                value: "Liang Yue",
                correct: false,
              },
              version: {
                value: 2.5,
                comparison: "Lower",
              },
              rarity: {
                value: 6,
                comparison: "Lower",
              },
              afflatus: {
                value: "Star",
                correct: true,
              },
              dmg_type: {
                value: "Reality",
                correct: false,
              },
              race: {
                value: "Mixed",
                correct: false,
              },
            }}
            lastAnimation={false}
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
            <li>Up to 3.7;</li>
          </ul>
        </section>
      </div>
    </div>,
    document.body,
  );
}
