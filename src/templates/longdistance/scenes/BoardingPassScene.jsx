import { useEffect, useRef, useState } from "react";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

export default function BoardingPassScene({ data, onNext }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, c.width, 0);
    g.addColorStop(0, "#14b8a6");
    g.addColorStop(1, "#6366f1");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffedd5";
    ctx.font = "bold 15px Quicksand, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch to see when we meet ✨", c.width / 2, c.height / 2);
  }, []);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const scratch = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    const p = pos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 36;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const check = () => {
    const c = canvasRef.current;
    const px = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < px.length; i += 16) {
      total++;
      if (px[i] === 0) cleared++;
    }
    if (total && cleared / total > 0.4) setRevealed(true);
  };

  const down = (e) => {
    if (revealed) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
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
    check();
  };

  return (
    <SceneWrapper>
      <p className="mb-6 text-center text-lg font-semibold text-indigo-100">
        Your boarding pass is ready 🎫
      </p>

      <div className="w-full overflow-hidden rounded-2xl bg-orange-100 text-left shadow-2xl">
        <div className="flex items-center justify-between bg-indigo-600 px-4 py-2 text-sm font-bold text-orange-100">
          <span>BOARDING PASS</span>
          <span>✈️</span>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-indigo-400">FROM</p>
              <p className="text-xl font-bold text-indigo-900">{data.cityA}</p>
            </div>
            <span className="text-2xl">✈️</span>
            <div className="text-right">
              <p className="text-xs font-semibold text-indigo-400">TO</p>
              <p className="text-xl font-bold text-indigo-900">{data.cityB}</p>
            </div>
          </div>

          <div className="mt-3 flex justify-between text-xs font-semibold text-indigo-500">
            <span>PASSENGER: {data.senderName}</span>
            <span>FLIGHT: LOVE 143</span>
          </div>

          <p className="mt-4 text-xs font-semibold text-indigo-400">DEPARTS</p>
          <div className="relative mt-1 h-14 overflow-hidden rounded-xl bg-white">
            <div className="flex h-full items-center justify-center text-xl font-bold text-teal-600">
              {data.nextMeet || "Soon ✨"}
            </div>
            <canvas
              ref={canvasRef}
              aria-label="Scratch to reveal the meeting date"
              className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
                revealed ? "pointer-events-none opacity-0" : "cursor-pointer"
              }`}
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
            />
          </div>
        </div>
      </div>

      {!revealed && (
        <p className="mt-4 text-center text-sm text-indigo-200">
          Scratch the box above to reveal the date
        </p>
      )}
      {revealed && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}