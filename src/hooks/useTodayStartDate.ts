import { useEffect, useState } from "react";
import { formatDate, getPreviousTuesday } from "@/components/season/useSeason";

function getTodayStartDate() {
  return getPreviousTuesday(formatDate(new Date()));
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
