import { useState, useRef, useEffect } from "react";

const WHEEL_COLORS = [
  "oklch(0.65 0.25 30)",
  "oklch(0.75 0.22 160)",
  "oklch(0.70 0.25 280)",
  "oklch(0.75 0.22 120)",
  "oklch(0.70 0.22 45)",
  "oklch(0.71 0.22 85)",
  "oklch(0.76 0.22 110)",
];

export default function Spinner  () {
  const [items, setItems] = useState([
    "Peroni",
    "Amstel",
    "Golden Brau",
    "Neumarkt",
    "Madri",
    "Tuborg",
    "🤡 Joker 🤡",
    "💀 Faliment 💀",
  ]);
  const [newItem, setNewItem] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const sliceAngle = (2 * Math.PI) / items.length;

    items.forEach((item, index) => {
      const startAngle = index * sliceAngle + (rotation * Math.PI) / 180;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = WHEEL_COLORS[index % WHEEL_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(item, radius / 1.6, 0);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = WHEEL_COLORS[0];
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const spinWheel = () => {
    if (isSpinning || items.length === 0) return;
    setIsSpinning(true);
    setWinner(null);

    const spins = 5 + Math.random() * 5;
    const extraDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + extraDegrees;
    const duration = 4000;
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        const normalizedRotation = currentRotation % 360;
        const adjustedRotation = (450 - normalizedRotation) % 360;
        const sliceAngle = 360 / items.length;
        const winnerIndex =
          Math.floor(adjustedRotation / sliceAngle) % items.length;
        setWinner(items[winnerIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  const deleteItem = (index: number) => {
    if (items.length <= 2) {
      alert("Coaie, macar 2 :(!");
      return;
    }
    setItems(items.filter((_, i) => i !== index));
    setWinner(null);
  };

  const addItem = () => {
    if (newItem.trim() && items.length < 12) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
      setWinner(null);
    }
  };

  useEffect(() => {
    drawWheel();
  }, [items, rotation]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 gap-6">
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-2xl">
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-red-500" />
          </div>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="w-full mt-6 hover:bg-blue-500 disabled:opacity-50 py-3 rounded-lg font-bold text-lg"
        >
          {isSpinning ? "Fikaaaaaaat..." : "Distrugeee-ti fikaatul!"}
        </button>
        {winner && (
          <div className="text-center mt-4 animate-bounce">
            {winner && <p className="text-sm text-gray-400">Da-i pe gat!</p>}
          </div>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-3">Manage Items</h2>
        <div className="flex gap-2 mb-4">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Add item..."
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
            maxLength={20}
          />
          <button
            onClick={addItem}
            disabled={!newItem.trim() || items.length >= 12}
            className="p-2 bg-green-600 hover:bg-green-500 rounded-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-800 p-2 rounded-lg mb-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: WHEEL_COLORS[index % WHEEL_COLORS.length],
                }}
              />
              <span>{item}</span>
            </div>
            <button
              onClick={() => deleteItem(index)}
              className="text-red-500 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <footer className="text-sm text-gray-500 mt-4 text-center max-w-md">
        <p>
          🤡 <b>Joker</b>: Iti permite sa alegi ce vrei sa bei.
        </p>
        <p>
          💀 <b>Faliment</b>: trebuie să bei un shot de tarie sau o bere
          întreaga (talpa). Poti scapa de asta cu 15 flotari supervizate.
        </p>
        <p className="mt-2 italic">Toate opțiunile au șanse egale 🍻</p>
      </footer>
    </div>
  );
}

export function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function Trash2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
