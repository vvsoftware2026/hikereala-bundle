import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface AppLaunchButtonProps {
  title: string;
  description: string;
  to: string;
  variant?: "default" | "secondary" | "outline";
}

export function AppLaunchButton({
  title,
  description,
  to,
  variant = "default",
}: AppLaunchButtonProps) {
  const variants: Record<string, string> = {
    default: "bg-black text-white hover:bg-black/90",
    secondary: "bg-white text-black border border-gray-200 hover:bg-gray-50",
    outline:
      "bg-transparent text-black border border-black/20 hover:bg-black/5",
  };

  return (
    <Link
      to={to}
      className={cn(
        "group flex flex-1 flex-col justify-between rounded-xl p-6 text-left",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
        "active:scale-[0.98]",
        variants[variant]
      )}
    >
      <div>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm opacity-80">{description}</p>
      </div>

      <span className="mt-4 inline-flex items-center text-sm font-medium opacity-80 group-hover:opacity-100">
        Open →
      </span>
    </Link>
  );
}
