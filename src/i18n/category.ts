import { ECarCategories, ETrackCategories } from "@/ir-data/utils/types";

const categoryValueToKey = Object.entries({
  ...ECarCategories,
  ...ETrackCategories,
}).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>,
);

export const getCategoryTranslationKey = (category: string) =>
  `categories.${categoryValueToKey[category] ?? category}`;
