import { parseScheduleEntryKey, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import i18n from "@/i18n";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import useSeason from "../season/useSeason";
import ScheduleActions from "./schedule-actions";
import ScheduleEmptyState from "./schedule-empty-state";
import SchedulePrintTable from "./schedule-print-table";
import ScheduleScreenContent from "./schedule-screen-content";
import { groupEntriesByDate } from "./schedule-utils";

function SchedulePage() {
  const { mySchedule, favoriteSeries } = useIr();
  const { seasonUseLocalTimezone } = useUi();
  const { weeksStartDates } = useSeason();
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  const locale = i18n.language;

  const entries = mySchedule
    .map(parseScheduleEntryKey)
    .filter((entry) => !!entry)
    .filter((entry) => favoriteSeries.includes(entry.seriesId));
  const entriesByDate = groupEntriesByDate(entries);

  return (
    <Page className="schedule-print-root">
      <Box className="no-print">
        <PageHeader
          title={t("pages.schedule.title")}
          description={t("pages.schedule.description")}
        />
      </Box>
      <ScheduleActions />
      {weeksStartDates.length === 0 ? (
        <ScheduleEmptyState navigate={navigate} />
      ) : (
        <>
          <ScheduleScreenContent
            weeksStartDates={weeksStartDates}
            entriesByDate={entriesByDate}
            locale={locale}
          />
          <SchedulePrintTable
            weeksStartDates={weeksStartDates}
            entriesByDate={entriesByDate}
            locale={locale}
            seasonUseLocalTimezone={seasonUseLocalTimezone}
          />
        </>
      )}
    </Page>
  );
}

export default SchedulePage;
