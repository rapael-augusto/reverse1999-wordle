/* eslint-disable react-hooks/purity */
import { useMemo } from "react";
import "./rain.css";

interface rainProps {
  upwards?: boolean;
  amount: number;
}

export default function Rain({ upwards = false, amount = 150 }: rainProps) {
  const drops = useMemo(() => {
    return Array.from({ length: amount }, () => ({
      left: Math.random() * 100,
      duration: 3 + Math.random() * 8,
      delay: Math.random() * 5,
      height: 20 + Math.random() * 80,
    }));
  }, [amount]);

  return (
    <div className="rain-container">
      {drops.map((drop, index) => (
        <i
          key={index}
          className="raindrop"
          style={{
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
            animationDirection: upwards ? "normal" : "reverse",
            background: `linear-gradient(${upwards ? "to top" : "to bottom"}, transparent, rgba(255,255,255,0.4))`,
          }}
        />
      ))}
    </div>
  );
}
