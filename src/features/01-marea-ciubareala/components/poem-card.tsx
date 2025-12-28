import Card from "../../../components/ui/card";

export function PoemCard({ lines }: { lines: string[] }) {
  return (
    <Card className="w-full max-w-md">
      <div className="card-header text-center">
        <h2 className="text-lg font-semibold">Poezie pentru prieteni</h2>
      </div>

      <div className="card-content flex flex-col items-center gap-1">
        {lines.map((line, index) => (
          <p key={index} className="text-sm leading-relaxed text-center">
            {line}
          </p>
        ))}
      </div>
    </Card>
  );
}
