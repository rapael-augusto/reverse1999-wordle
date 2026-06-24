import { useEffect, useRef, useState } from "react";
import "./chessboard.css";

export default function ChessBoard() {
  const [flipping, setFlipping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(0);
  const [cols, setCols] = useState(0);

  const rows = 8;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const size = height / rows; //guarantees all cells will be squares
      setCellSize(size);
      setCols(Math.ceil(width / size));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (cols === 0) return;
    const interval = setInterval(() => {
      setFlipping(true);
      const maxDelay = (cols - 1) * 80;
      setTimeout(() => setFlipping(false), maxDelay + 3000);
    }, 10000);
    return () => clearInterval(interval);
  }, [cols]);

  return (
    <div
      ref={containerRef}
      className="chessboard-container"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const isBlack = (row + col) % 2 !== 0;

        return (
          <div
            key={i}
            className="cell"
            style={{ "--col": col, "--row": row } as React.CSSProperties}
          >
            {isBlack && (
              <div className={`cell-inner ${flipping ? "flipping" : ""}`}>
                <div className="cell-front" />
                <div className="cell-back" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
