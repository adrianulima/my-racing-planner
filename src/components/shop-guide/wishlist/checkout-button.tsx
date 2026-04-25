import { IR_URL } from "@/ir-data/utils/urls";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";

function CheckoutButton({ wishList }: { wishList: { sku: number }[] }) {
  const { t } = useTranslation();
  return (
    <Button
      id="checkout"
      as={"a"}
      disabled={wishList.length < 1}
      size="lg"
      href={
        wishList.length > 0
          ? `${IR_URL.store}?skus=${wishList.map((c) => c.sku)}`
          : undefined
      }
      target="_blank"
      rel="noreferrer"
      colorPalette={"blue"}
    >
      {t("shop.checkout")}
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </Button>
  );
}

export default CheckoutButton;
