import { useUi } from "@/store/ui";
import { FormatNumber, HStack, Separator, Stack, Text } from "@chakra-ui/react";

function PriceDiscountPanel({ wishList }: { wishList: { price: number }[] }) {
  const { shopLoyaltyDiscount, shopVolumeDiscount } = useUi();
  const totalPrice = wishList.reduce((acc, curr) => acc + curr.price, 0);

  const discountEligibleCount = wishList.filter(
    (item) => item.price > 6,
  ).length;

  const discount = shopLoyaltyDiscount
    ? 20
    : !shopVolumeDiscount
      ? 0
      : discountEligibleCount < 3
        ? 0
        : discountEligibleCount < 6
          ? 10
          : discountEligibleCount < 20
            ? 15
            : 20;
  const discountAmount = (totalPrice * discount) / 100;
  const totalPriceDiscount = totalPrice - discountAmount;

  return (
    <HStack
      mt={2}
      justifyContent={"space-between"}
      fontWeight={"bold"}
      alignItems={"end"}
    >
      <Text textStyle="4xl">Total</Text>
      <Stack alignItems={"end"} gap={0}>
        {(shopVolumeDiscount || shopLoyaltyDiscount) && (
          <>
            <HStack color={"gray"}>
              <FormatNumber
                style="currency"
                currency="USD"
                value={totalPrice}
              />
              <Text>-</Text>
              <FormatNumber
                style="currency"
                currency="USD"
                value={discountAmount}
              />
            </HStack>
            <Text
              color={"gray"}
              textAlign={"center"}
              textStyle="xs"
              fontWeight={"normal"}
            >
              {discount}% discount (
              {shopLoyaltyDiscount
                ? "loyalty"
                : `${discountEligibleCount} items`}
              )
            </Text>
            <Separator mt={1} />
          </>
        )}
        <Text fontSize={"2xl"}>
          <FormatNumber
            style="currency"
            currency="USD"
            value={totalPriceDiscount}
          />
        </Text>
      </Stack>
    </HStack>
  );
}

export default PriceDiscountPanel;
