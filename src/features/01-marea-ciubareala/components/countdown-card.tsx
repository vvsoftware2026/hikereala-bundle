import Button from "../../../components/ui/button";
import Card from "../../../components/ui/card";
import { formatTwo } from "../../../utils/time-utils";
import { TimeBox } from "./time-box";

interface CountdownCardProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  durationDays: number;
}

export function CountdownCard({
  days,
  hours,
  minutes,
  seconds,
  durationDays,
}: CountdownCardProps) {
  return (
    <Card className="w-full max-w-md mb-6">
      <div className="card-header">
        <h2 className="text-lg font-semibold">Până la eveniment</h2>
      </div>

      <div className="card-content flex flex-col items-center gap-4">
        <p className="text-sm text-gray-600">
          Perioadă: {durationDays} zile de distracție
        </p>

        <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
          <TimeBox label="Zile" value={String(days)} />
          <TimeBox label="Ore" value={formatTwo(hours)} />
          <TimeBox label="Min" value={formatTwo(minutes)} />
          <TimeBox label="Sec" value={formatTwo(seconds)} />
        </div>

        <Button variant="ghost" onClick={() => alert("Să înceapă petrecerea!")}>
          Remind me
        </Button>
      </div>
    </Card>
  );
}
