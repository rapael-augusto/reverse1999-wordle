import { useEffect, useRef } from "react";

export default function Wave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    resize();
    window.addEventListener("resize", resize);

    const waves = [
      { amplitude: 18, frequency: 0.008, speed: 0.0004, offset: 0 },
      { amplitude: 12, frequency: 0.013, speed: 0.0003, offset: 2 },
      { amplitude: 8, frequency: 0.02, speed: 0.0006, offset: 4 },
    ];
    let time = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const cW = canvas.width;
      const cH = canvas.height;
      const baseY = cH * 0.82;

      ctx.clearRect(0, 0, cW, cH);

      ctx.beginPath();
      ctx.moveTo(0, cH);

      for (let x = 0; x <= cW; x++) {
        const y = waves.reduce((sum, w) => {
          return (
            sum +
            w.amplitude *
              dpr *
              Math.sin(x * w.frequency + time * w.speed * 100 + w.offset)
          );
        }, baseY);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(cW, cH);
      ctx.lineTo(0, cH);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, baseY, 0, cH);
      gradient.addColorStop(0, `rgba(30, 30, 30, 0.2)`);
      gradient.addColorStop(0.4, `rgba(30, 30, 30, 0.5)`);
      gradient.addColorStop(1, `rgba(30, 30, 30, 0.85)`);

      ctx.fillStyle = gradient;
      ctx.fill();

      time++;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
