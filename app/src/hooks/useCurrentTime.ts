import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function useCurrentTime(): string {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return time;
}
