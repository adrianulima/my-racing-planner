import SORTED_CARS, { FREE_CARS_COUNT } from "@/ir-data/utils/cars";
import { ECarCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import ContentPage from "./content-page";

function CarsPage() {
  const { myCars, wishCars } = useIr();
  const { t } = useTranslation();
  return (
    <ContentPage
      allTab={ECarCategories.all}
      content={"cars"}
      contentListJson={SORTED_CARS}
      description={t("pages.cars.description")}
      freeCount={FREE_CARS_COUNT}
      myContent={myCars}
      skuIcon={faCar}
      tabs={ECarCategories}
      title={t("pages.cars.title")}
      wish={wishCars}
    />
  );
}

export default CarsPage;
