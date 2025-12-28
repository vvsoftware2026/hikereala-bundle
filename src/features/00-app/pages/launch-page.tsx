import { AppLaunchButton } from "../../../components/ui/app-launch-button";

export default function LaunchPage() {
  return (
    <main className="flex-1 w-full px-4 py-10 flex flex-col">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Hikereala Bundle
        </h1>

        <p className="text-sm sm:text-base text-gray-700">
          The future in modern hikereala software.
          <br />
          Developed with lots of love and barbataureala.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <AppLaunchButton
          title="Marea Ciubăreală"
          description="Countdown, poezie si distractie maxima"
          to="/marea-ciubareala"
        />

        <AppLaunchButton
          title="Spin the Drink"
          description="Randomizer pentru decizii grele"
          to="/spin-the-drink"
          variant="secondary"
        />

        <AppLaunchButton
          title="HBS"
          description="Hikereala Bill Spliter"
          to="/hbs"
          variant="outline"
        />
      </div>
    </main>
  );
}
