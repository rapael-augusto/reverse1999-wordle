import { useCallback, useEffect, useRef } from "react";

function withAlpha(color: string, alpha: number) {
  return color.replace("hsl(", "hsla(").replace(")", `, ${alpha})`);
}

function getCssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export default function NoisyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const backgroundColor = getCssVar("--secondary-color");
    const accentColor = getCssVar("--primary-color");

    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const cW = canvas.width;
    const cH = canvas.height;

    //background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, cW, cH);

    //triangle (the perfect form, obviously)
    ctx.filter = "blur(30px)";
    ctx.globalAlpha = 0.4;

    const grad = ctx.createLinearGradient(0, cH, cW * 0.17, cH * 0.7);
    grad.addColorStop(0, accentColor);
    grad.addColorStop(0.55, withAlpha(accentColor, 0.25));
    grad.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.moveTo(0, cH);
    ctx.lineTo(0, cH * 0.7);
    ctx.lineTo(cW * 0.17, cH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    //return the filter and global alpha to default values
    ctx.globalAlpha = 1;
    ctx.filter = "none";

    //the circle (got it?)
    const circleX = cW * 0.3; //20% of width
    const circleY = cH * 0.4; //40% of height
    const radius = Math.min(cW, cH) * 0.2;
    ctx.filter = "blur(80px)";

    const circleGrad = ctx.createRadialGradient(
      circleX,
      circleY,
      0,
      circleX,
      circleY,
      radius,
    );
    circleGrad.addColorStop(0, accentColor);
    circleGrad.addColorStop(0.4, withAlpha(accentColor, 0.2));
    circleGrad.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
    ctx.fillStyle = circleGrad;
    ctx.fill();

    //grain noise
    const imageData = ctx.createImageData(cW, cH);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = (Math.random() * 255) | 0;
      const alpha = (Math.random() * 0.15 * 255) | 0;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = alpha;
    }

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = cW;
    tempCanvas.height = cH;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.putImageData(imageData, 0, 0);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, cW, cH);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [draw]);

  useEffect(() => {
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [draw]);

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
