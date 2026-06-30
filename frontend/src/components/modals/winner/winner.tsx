import { useTranslation } from "react-i18next";
import type { Character } from "../../../pages/home/home";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import "./winner.css";
import { createPortal } from "react-dom";

interface WinnerModalProps {
  onClose: () => void;
  character: Character;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function WinnerModal({ onClose, character }: WinnerModalProps) {
  const { t } = useTranslation();
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const tomorrow = new Date(now);

    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const difference = +tomorrow - +now;

    let timeLeft: TimeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return createPortal(
    <div className="winner-overlay" onClick={onClose}>
      <div className="winner-dropdown fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="winner-header">
          <div className="winner-title">
            <h2>{t("winnerModal.title")}</h2>
            <h2>{t("winnerModal.subtitle")}</h2>
          </div>
          <button className="close-modal" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="winner-body">
          <img
            src={`/splashs/${character.slug}.webp`}
            alt={character.slug}
            className="winner-image"
          />
          <p>{character.name}</p>
        </div>
        <div className="winner-footer">
          <p>{t("winnerModal.footer")}</p>
          <p>
            {timeLeft.hours || "00"}h {timeLeft.minutes || "00"}m{" "}
            {timeLeft.seconds || "00"}s
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
