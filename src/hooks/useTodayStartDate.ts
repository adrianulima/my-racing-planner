import { useEffect, useState } from "react";

function getTodayStartDate() {
  const now = new Date();
  const day = now.getDay();
  const diff = (day + 5) % 7;
  const tuesday = new Date(now);
  tuesday.setDate(now.getDate() - diff);
  const y = tuesday.getFullYear();
  const m = String(tuesday.getMonth() + 1).padStart(2, "0");
  const d = String(tuesday.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function useTodayStartDate() {
  const [todayStartDate, setTodayStartDate] = useState(getTodayStartDate);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const next = getTodayStartDate();
      setTodayStartDate((prev) => (prev === next ? prev : next));
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return todayStartDate;
}

export default useTodayStartDate;
