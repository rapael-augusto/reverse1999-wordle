import { useEffect, useRef, useState } from "react";
import "./feathers.css";
import { GiFeather } from "react-icons/gi";

interface featherProps {
  amount?: number;
}

interface featherConfig {
  id: number;
  xStart: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  size: number;
  opacity: number;
  baseRotation: number;
  rotationAmount: number;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateFeathers(count: number, width: number): featherConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const leftSide = i % 2 === 0;

    return {
      id: i,
      xStart: leftSide
        ? randomBetween(0, width * 0.35)
        : randomBetween(width * 0.65, width),
      phase: leftSide ? 0 : Math.PI,
      amplitude: randomBetween(30, 70),
      frequency: randomBetween(0.018, 0.03),
      speed: randomBetween(0.3, 0.7),
      size: randomBetween(16, 32),
      opacity: randomBetween(0.4, 0.85),
      baseRotation: randomBetween(-40, 40),
      rotationAmount: randomBetween(15, 35),
    };
  });
}

export default function Feathers({ amount = 25 }: featherProps) {
  const [configs, setConfigs] = useState<featherConfig[]>([]);

  const featherRefs = useRef<(HTMLDivElement | null)[]>([]);
  const yPositions = useRef<number[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function createFeathers() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const feathers = generateFeathers(amount, w);
      setConfigs(feathers);
      yPositions.current = feathers.map(() => randomBetween(-h, 0));
    }

    createFeathers();
    window.addEventListener("resize", createFeathers);

    return () => {
      window.removeEventListener("resize", createFeathers);
    };
  }, [amount]);

  useEffect(() => {
    if (!configs.length) return;

    function animate() {
      const h = window.innerHeight;
      configs.forEach((f, i) => {
        const el = featherRefs.current[i];

        if (!el) return;
        yPositions.current[i] += f.speed;

        if (yPositions.current[i] > h + 50) {
          yPositions.current[i] = -50;
        }

        const y = yPositions.current[i];
        const sine = Math.sin(y * f.frequency + f.phase);
        const x = f.xStart + f.amplitude * sine;
        const rotation = f.baseRotation + f.rotationAmount * sine;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [configs]);

  return (
    <div className="feathers-container">
      {configs.map((f, i) => (
        <div
          key={f.id}
          ref={(el) => {
            featherRefs.current[i] = el;
          }}
          className="feather-item"
          style={{
            opacity: f.opacity,
          }}
        >
          <GiFeather
            style={{
              fontSize: f.size,
              color: "white",
            }}
          />
        </div>
      ))}
    </div>
  );
}
