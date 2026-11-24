import { useEffect, useRef, useState } from "react";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

export default function PostcardScene({ data, onNext }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0, "#fdba74");
    g.addColorStop(1, "#fb923c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff7ed";
    ctx.font = "bold 18px Quicksand, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch here ✨", c.width / 2, c.height / 2);
  }, []);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const scratch = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    const p = pos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const down = (e) => {
    if (revealed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
    scratch(e);
  };

  const move = (e) => {
    if (drawing.current && !revealed) scratch(e);
  };

  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const c = canvasRef.current;
    const px = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < px.length; i += 16) {
      total++;
      if (px[i] === 0) cleared++;
    }
    if (cleared / total > 0.45) setRevealed(true);
  };

  return (
    <SceneWrapper>
      <p className="mb-6 text-lg font-semibold text-sky-800">
        A postcard just for you 📮
      </p>

      <div className="relative h-48 w-72 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-orange-50 px-4">
          <span className="absolute right-3 top-3 rounded border-2 border-dashed border-orange-400 px-2 py-1 text-xs font-bold text-orange-500">
            POST
          </span>
          <p className="text-2xl font-bold text-orange-500">{data.postcardLine}</p>
          <p className="mt-2 text-sm font-semibold text-sky-700">
            — {data.senderName}
          </p>
        </div>

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
            revealed ? "pointer-events-none opacity-0" : "cursor-pointer"
          }`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        />
      </div>

      {!revealed && (
        <p className="mt-4 text-sm text-sky-600">Scratch the card to reveal</p>
      )}
      {revealed && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}