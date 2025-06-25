import { createSimpleScheduleDescription } from "@/utils/simple-schedule";
import { Badge } from "@chakra-ui/react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DurationBadge({
  duration,
  laps,
}: {
  duration: number | null;
  laps: number | null;
}) {
  const durationLaps = createSimpleScheduleDescription(laps, duration);
  return (
    <Badge colorPalette={laps ? "pink" : "purple"}>
      <FontAwesomeIcon icon={laps ? faCircleNotch : faClock} size="xs" />
      {durationLaps}
    </Badge>
  );
}

export default DurationBadge;
