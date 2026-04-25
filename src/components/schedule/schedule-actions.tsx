import { Button, HStack, IconButton } from "@chakra-ui/react";
import { faGears, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import ScheduleSettingsPopover from "./schedule-settings-popover";

function ScheduleActions() {
  const { t } = useTranslation();

  return (
    <HStack mb={2} w="full" justify="space-between" className="no-print">
      <PopoverRoot positioning={{ placement: "right-start" }}>
        <PopoverTrigger asChild>
          <IconButton
            aria-label={t("common.settings")}
            variant="outline"
            size="lg"
            bgColor={{ base: "bg.muted", _hover: "bg" }}
            borderRadius="md"
          >
            <FontAwesomeIcon icon={faGears} />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <ScheduleSettingsPopover />
        </PopoverContent>
      </PopoverRoot>
      <Button
        aria-label={t("common.print")}
        variant="outline"
        size="lg"
        bgColor={{ base: "bg.muted", _hover: "bg" }}
        borderRadius="md"
        onClick={() => window.print()}
      >
        <HStack gap={2}>
          <FontAwesomeIcon icon={faPrint} />
          <span>{t("common.print")}</span>
        </HStack>
      </Button>
    </HStack>
  );
}

export default ScheduleActions;
