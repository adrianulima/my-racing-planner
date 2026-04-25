import { isNurbCombined } from "@/ir-data/utils/tracks";
import { setMyCar, setMyTrack, setWishCar, setWishTrack } from "@/store/ir";
import { trackEvent } from "@/utils/analytics";
import { faBookmark, faSackXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, CheckboxProps } from "../ui/checkbox";
import NurbInfoIcon from "./nurb-info-icon";

function ContentCheckbox({
  content,
  free,
  owned,
  wish,
  sku,
  contentId,
  size,
  ...rest
}: CheckboxProps & {
  content: "cars" | "tracks";
  free: boolean;
  owned: boolean;
  wish: boolean;
  sku: number;
  contentId: number;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const [setMy, setWish] =
    content === "cars" ? [setMyCar, setWishCar] : [setMyTrack, setWishTrack];
  const isNurb = isNurbCombined(contentId);
  return isNurb ? (
    <NurbInfoIcon
      size={size}
      top={rest.top}
      left={rest.left}
      position={rest.position}
    />
  ) : (
    <Checkbox
      readOnly={free}
      size={size}
      colorPalette={free ? "green" : wish ? "blue" : undefined}
      checked={free || owned || wish}
      controlProps={{
        borderColor: !free && !wish && !owned ? "gray.400" : undefined,
      }}
      icon={
        free ? (
          <FontAwesomeIcon
            size={size === "xs" ? "2xs" : "xs"}
            icon={faSackXmark}
          />
        ) : wish ? (
          <FontAwesomeIcon
            size={size === "xs" ? "2xs" : "xs"}
            icon={faBookmark}
          />
        ) : undefined
      }
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (free) return;
        if (wish) {
          trackEvent("content_state_change", {
            content_type: content,
            new_state: "none",
          });
          setWish(sku, false);
          setMy(sku, false);
        } else if (owned) {
          trackEvent("content_state_change", {
            content_type: content,
            new_state: "wishlist",
          });
          setMy(sku, false);
          setWish(sku, true);
        } else {
          trackEvent("content_state_change", {
            content_type: content,
            new_state: "owned",
          });
          setMy(sku, true);
          setWish(sku, false);
        }
      }}
      {...rest}
    />
  );
}

export default ContentCheckbox;
