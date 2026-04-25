import { usePageTracking } from "@/hooks/usePageTracking";
import { ETabs } from "@/store/ui";
import { Flex } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";
import LoadingContainer from "../page/loading-container";

const CarsPage = lazy(() => import("../content/cars-page"));
const SeasonPage = lazy(() => import("../season/season-page"));
const SeriesPage = lazy(() => import("../series/series-page"));
const ShopPage = lazy(() => import("../shop-guide/shop-page"));
const TracksPage = lazy(() => import("../content/tracks-page"));
const HistoryPage = lazy(() => import("../history/history-page"));
const SchedulePage = lazy(() => import("../schedule/schedule-page"));

function MainContainer() {
  usePageTracking();
  return (
    <Flex
      overflow={"hidden"}
      flex={1}
      width={"100%"}
      padding="8px"
      bg={"irbgc.light"}
      borderColor={"irborder.light"}
      _dark={{ bg: "irbgc.dark", borderColor: "irborder.dark" }}
      md={{
        borderRadius: "xl",
        borderWidth: "1px",
        boxShadow: "rgba(5, 5, 15, 0.16) 0px 12px 24px -2px",
      }}
    >
      <Suspense fallback={<LoadingContainer />}>
        <Switch>
          <Route path={ETabs.MySeason} component={SeasonPage} />
          <Route path={ETabs.MySeries} component={SeriesPage} />
          <Route path={ETabs.MyCars} component={CarsPage} />
          <Route path={ETabs.MyTracks} component={TracksPage} />
          <Route path={ETabs.MySchedule} component={SchedulePage} />
          <Route path={ETabs.ShopGuide} component={ShopPage} />
          <Route path={ETabs.History} component={HistoryPage} />

          <Route>
            <Redirect to={ETabs.MySeason} />
          </Route>
        </Switch>
      </Suspense>
    </Flex>
  );
}

export default MainContainer;
