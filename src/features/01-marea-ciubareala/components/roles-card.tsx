import Card from "../../../components/ui/card";

export function RolesCard() {
  return (
    <Card className="w-full max-w-md">
      <div className="card-header text-center">
        <h2 className="text-lg font-semibold">Roluri</h2>
      </div>

      <div className="card-content flex justify-center">
        <ul className="text-sm list-disc list-inside space-y-1 text-center">
          <li>Bogdan — se ocupă de grătar</li>
          <li>Vlad Șiculan — sparge lemne</li>
          <li>Vlad Jurj — se ocupă de foc</li>
          <li>Nico & Rebeca — se relaxează la TV</li>
        </ul>
      </div>
    </Card>
  );
}
