import { useCountdown } from "../hooks/use-countdown";
import { CountdownCard } from "../components/countdown-card";
import { PoemCard } from "../components/poem-card";
import { RolesCard } from "../components/roles-card";
import {
  EVENT_DURATION_DAYS,
  POEM_LINES,
  TARGET_DATE,
} from "../config/event-config";

export default function MareaCiubarealaPage() {
  const countdown = useCountdown(TARGET_DATE);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#f5b6b3] to-[#fbe4e3] flex justify-center">
      <div className="w-full max-w-md flex flex-col items-center py-8 px-4 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Marea Ciubăreală — Countdown
        </h1>

        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold">Hikereala - VIII</h2>
          <h2 className="text-lg font-semibold">Ciubareala - VI</h2>
          <h2 className="text-lg font-semibold">🔥 Faclie la Ilie</h2>
        </div>

        <CountdownCard {...countdown} durationDays={EVENT_DURATION_DAYS} />
        <PoemCard lines={POEM_LINES} />
        <RolesCard />
      </div>
    </main>
  );
}
