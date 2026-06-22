import {
  Badge,
  Button,
  Field,
  For,
  HStack,
  Input,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClock } from "@fortawesome/free-solid-svg-icons";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import { Tooltip } from "../ui/tooltip";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { setFavoriteSeriesItem, useIr } from "@/store/ir";
import { trackEvent } from "@/utils/analytics";
import useDebounce from "@/hooks/useDebounce";
import LicenseBadge from "../badges/license-badge";
import StarCheckbox from "../series/star-checkbox";
import SERIES_JSON from "@/ir-data/series.json";
import { CategoryIcon } from "@/ir-data/utils/icons";
import type { DetailSeriesEntry } from "./use-detail-data";
import {
  CATEGORY_OPTIONS,
  LICENSE_COLORS,
  LICENSE_NAMES,
  LICENSE_OPTIONS,
} from "./detail-constants";

function DetailSeriesTable({
  entries,
  type,
}: {
  entries: DetailSeriesEntry[];
  type: "cars" | "tracks";
}) {
  const { favoriteSeries } = useIr();
  const { t } = useTranslation();

  const [seriesFilter, setSeriesFilter] = useState("");
  const [licenseFilter, setLicenseFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [filterUnranked, setFilterUnranked] = useState(false);
  const [filterFixed, setFilterFixed] = useState(false);
  const [filterFavs, setFilterFavs] = useState(false);
  const [durationMin, setDurationMin] = useState("");
  const [durationMax, setDurationMax] = useState("");
  const debouncedSeries = useDebounce(seriesFilter, 300);

  const filteredEntries = useMemo(() => {
    let result = entries;
    if (debouncedSeries) {
      const q = debouncedSeries
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      result = result.filter((e) =>
        e.seriesName.toLowerCase().includes(q),
      );
    }
    if (licenseFilter.length > 0) {
      const set = new Set(licenseFilter);
      result = result.filter((e) => set.has(e.license.letter));
    }
    if (type === "tracks" && categoryFilter.length > 0) {
      const set = new Set(categoryFilter);
      result = result.filter((e) => {
        const series =
          SERIES_JSON[e.seriesId.toString() as keyof typeof SERIES_JSON];
        return series && set.has(series.category);
      });
    }
    if (filterUnranked) {
      result = result.filter((e) => !e.official);
    }
    if (filterFixed) {
      result = result.filter((e) => e.fixed);
    }
    if (filterFavs) {
      result = result.filter((e) => favoriteSeries.includes(e.seriesId));
    }
    const min = durationMin ? Number(durationMin) : undefined;
    const max = durationMax ? Number(durationMax) : undefined;
    if (min !== undefined || max !== undefined) {
      result = result.filter((e) => {
        if (e.duration === null) return false;
        if (min !== undefined && e.duration < min) return false;
        if (max !== undefined && e.duration > max) return false;
        return true;
      });
    }
    return result;
  }, [entries, debouncedSeries, licenseFilter, categoryFilter, filterUnranked, filterFixed, filterFavs, favoriteSeries, type, durationMin, durationMax]);

  const toggleLicense = (letter: string) => {
    setLicenseFilter((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter],
    );
  };

  const toggleCategory = (key: string) => {
    setCategoryFilter((prev) =>
      prev.includes(key)
        ? prev.filter((c) => c !== key)
        : [...prev, key],
    );
  };

  return (
    <Table.ScrollArea width="100%" maxH={"calc(100vh - 300px)"} borderRadius={"md"}>
      <Table.Root stickyHeader size="sm" striped>
        <Table.Header>
          <Table.Row bgColor={"bg.muted"}>
            <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
              <Tooltip
                content={t("common.favorites")}
                disabled={!filterFavs}
              >
                <StarCheckbox
                  ids={{ root: "favFilter" }}
                  gray
                  onClick={(e) => e.stopPropagation()}
                  checked={filterFavs}
                  onCheckedChange={(e) => setFilterFavs(!!e.checked)}
                />
              </Tooltip>
            </Table.ColumnHeader>
            <Table.ColumnHeader width={"100%"}>
              <HStack gap={2}>
                <Text whiteSpace={"nowrap"}>{t("common.series")}</Text>
                <Input
                  placeholder={t("common.search")}
                  size={"2xs"}
                  width={"100%"}
                  maxW={"500px"}
                  value={seriesFilter}
                  onChange={(e) => setSeriesFilter(e.target.value)}
                />
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader minWidth={"70px"} textAlign={"center"}>
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <HStack gap={1} justify={"center"} cursor={"pointer"}>
                    <Text>{t("common.license")}</Text>
                    <FontAwesomeIcon icon={faChevronDown} size="2xs" />
                  </HStack>
                </PopoverTrigger>
                <PopoverContent width={"auto"}>
                  <PopoverBody>
                    <VStack gap={1}>
                      {LICENSE_OPTIONS.map((l) => (
                        <Button
                          key={l}
                          size={"xs"}
                          width={"100%"}
                          justifyContent={"flex-start"}
                          variant={
                            licenseFilter.includes(l) ? "surface" : "ghost"
                          }
                          onClick={() => toggleLicense(l)}
                        >
                          <HStack gap={2}>
                            <LicenseBadge
                              letter={l}
                              color={LICENSE_COLORS[l] ?? "888888"}
                              size={"xs"}
                            >
                              {l}
                            </LicenseBadge>
                            <Text fontSize={"xs"}>{LICENSE_NAMES[l]}</Text>
                          </HStack>
                        </Button>
                      ))}
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </Table.ColumnHeader>
            {type === "tracks" && (
              <Table.ColumnHeader minWidth={"70px"} textAlign={"center"}>
                <PopoverRoot>
                  <PopoverTrigger asChild>
                    <HStack gap={1} justify={"center"} cursor={"pointer"}>
                      <Text>{t("common.category")}</Text>
                      <FontAwesomeIcon icon={faChevronDown} size="2xs" />
                    </HStack>
                  </PopoverTrigger>
                  <PopoverContent width={"auto"}>
                    <PopoverBody>
                      <VStack gap={1}>
                        {CATEGORY_OPTIONS.map((opt) => (
                          <Button
                            key={opt.key}
                            size={"xs"}
                            width={"100%"}
                            justifyContent={"flex-start"}
                            variant={
                              categoryFilter.includes(opt.key) ? "surface" : "ghost"
                            }
                            onClick={() => toggleCategory(opt.key)}
                          >
                            <HStack gap={2}>
                              <CategoryIcon
                                category={opt.key}
                                boxSize={"14px"}
                              />
                              <Text fontSize={"xs"}>{opt.label}</Text>
                            </HStack>
                          </Button>
                        ))}
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </PopoverRoot>
              </Table.ColumnHeader>
            )}
            <Table.ColumnHeader minWidth={"80px"} textAlign={"center"}>
              {t("common.weeks")}
            </Table.ColumnHeader>
            <Table.ColumnHeader minWidth={"80px"} textAlign={"center"}>
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <HStack gap={1} justify={"center"} cursor={"pointer"}>
                    <Text>
                      {durationMin || durationMax
                        ? `${durationMin || "0"}-${durationMax || "∞"}m`
                        : t("common.duration")}
                    </Text>
                    <FontAwesomeIcon icon={faChevronDown} size="2xs" />
                  </HStack>
                </PopoverTrigger>
                <PopoverContent width={"200px"}>
                  <PopoverBody>
                    <VStack gap={3}>
                      <Field.Root>
                        <Field.Label fontSize={"xs"}>
                          {t("common.min")}
                        </Field.Label>
                        <Input
                          size={"xs"}
                          type={"number"}
                          placeholder={"0"}
                          value={durationMin}
                          onChange={(e) => setDurationMin(e.target.value)}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label fontSize={"xs"}>
                          {t("common.max")}
                        </Field.Label>
                        <Input
                          size={"xs"}
                          type={"number"}
                          placeholder={"∞"}
                          value={durationMax}
                          onChange={(e) => setDurationMax(e.target.value)}
                        />
                      </Field.Root>
                      {(durationMin || durationMax) && (
                        <Button
                          size={"xs"}
                          width={"100%"}
                          variant={"ghost"}
                          onClick={() => {
                            setDurationMin("");
                            setDurationMax("");
                          }}
                        >
                          {t("common.clear")}
                        </Button>
                      )}
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </Table.ColumnHeader>
            <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <HStack gap={1} justify={"center"} cursor={"pointer"}>
                    <Text>{t("common.type")}</Text>
                    <FontAwesomeIcon icon={faChevronDown} size="2xs" />
                  </HStack>
                </PopoverTrigger>
                <PopoverContent width={"auto"}>
                  <PopoverBody>
                    <VStack gap={2} alignItems={"stretch"}>
                      <HStack
                        gap={2}
                        cursor={"pointer"}
                        onClick={() => setFilterUnranked(!filterUnranked)}
                        opacity={filterUnranked ? 1 : 0.5}
                      >
                        <Badge
                          colorPalette={"orange"}
                          size={"xs"}
                          variant={filterUnranked ? "solid" : "outline"}
                        >
                          {t("common.unranked")}
                        </Badge>
                      </HStack>
                      <HStack
                        gap={2}
                        cursor={"pointer"}
                        onClick={() => setFilterFixed(!filterFixed)}
                        opacity={filterFixed ? 1 : 0.5}
                      >
                        <Badge
                          colorPalette={"blue"}
                          size={"xs"}
                          variant={filterFixed ? "solid" : "outline"}
                        >
                          {t("common.fixed")}
                        </Badge>
                      </HStack>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For
            each={filteredEntries}
            children={(entry) => (
              <Table.Row key={entry.seriesId} bgColor={"transparent"}>
                <Table.Cell textAlign={"center"} minWidth={"40px"}>
                  <StarCheckbox
                    size={"xs"}
                    checked={favoriteSeries.includes(entry.seriesId)}
                    onCheckedChange={({ checked }) => {
                      setFavoriteSeriesItem(entry.seriesId, !!checked);
                      trackEvent("favorite_series_change", {
                        action: checked ? "add" : "remove",
                        category: entry.seriesCategory,
                        license: entry.license.letter,
                      });
                    }}
                  />
                </Table.Cell>
                <Table.Cell width={"100%"}>
                  <Text fontWeight={"bold"} truncate>
                    {entry.seriesName}
                  </Text>
                </Table.Cell>
                <Table.Cell textAlign={"center"} minWidth={"70px"}>
                  <LicenseBadge
                    letter={entry.license.letter}
                    color={entry.license.color}
                    size={"xs"}
                  >
                    {entry.license.letter}
                  </LicenseBadge>
                </Table.Cell>
                {type === "tracks" && (() => {
                  const s = SERIES_JSON[entry.seriesId.toString() as keyof typeof SERIES_JSON];
                  const cat = s?.category ?? "";
                  return (
                    <Table.Cell textAlign={"center"} minWidth={"70px"}>
                      <CategoryIcon category={cat} boxSize={"16px"} />
                    </Table.Cell>
                  );
                })()}
                <Table.Cell textAlign={"center"} minWidth={"80px"}>
                  <Text fontSize={"sm"}>{entry.weekCount}</Text>
                </Table.Cell>
                <Table.Cell textAlign={"center"} minWidth={"70px"}>
                  {entry.duration ? (
                    <HStack gap={1} justifyContent={"center"}>
                      <FontAwesomeIcon icon={faClock} size="xs" />
                      <Text fontSize={"sm"}>{entry.duration}m</Text>
                    </HStack>
                  ) : (
                    <Text fontSize={"sm"}>-</Text>
                  )}
                </Table.Cell>
                <Table.Cell textAlign={"center"} minWidth={"60px"}>
                  {!entry.official && (
                    <Badge colorPalette={"orange"} size={"xs"}>
                      {t("common.unranked")}
                    </Badge>
                  )}
                  {entry.fixed && (
                    <Badge colorPalette={"blue"} size={"xs"}>
                      {t("common.fixed")}
                    </Badge>
                  )}
                  {!entry.fixed && entry.official && (
                    <Text fontSize={"sm"}>-</Text>
                  )}
                </Table.Cell>
              </Table.Row>
            )}
          />
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}

export default DetailSeriesTable;
