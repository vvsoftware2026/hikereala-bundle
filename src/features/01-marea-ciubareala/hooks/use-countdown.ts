import { useEffect, useState } from "react";
import { getTimeParts } from "../../../utils/time-utils";

export function useCountdown(targetDate: Date) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 250);

    return () => clearInterval(id);
  }, []);

  const diff = targetDate.getTime() - now.getTime();
  return getTimeParts(diff);
}
