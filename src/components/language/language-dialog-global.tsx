import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import i18n, { Language, supportedLanguages } from "@/i18n";
import { setLanguage, useUi } from "@/store/ui";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { create } from "zustand";
import { Radio, RadioGroup } from "../ui/radio";

const useLanguageDialog = create<{ open: boolean }>(() => ({ open: false }));

export const openLanguageDialog = () =>
  useLanguageDialog.setState({ open: true });

function LanguageDialogGlobal() {
  const { open } = useLanguageDialog();
  const { language } = useUi();
  const { t } = useTranslation();

  const changeLanguage = (value: Language) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(event) => useLanguageDialog.setState({ open: event.open })}
      size="sm"
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogContent
        width={{ base: "calc(100vw - 32px)", md: "420px" }}
        maxW={{ base: "calc(100vw - 32px)", md: "420px" }}
        maxH={{ base: "min(560px, calc(100dvh - 32px))", md: "560px" }}
      >
        <DialogHeader textAlign={"left"} pb={2}>
          <DialogTitle>{t("languages.dialogTitle")}</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 6 }} pb={6} overflow="hidden">
          <Stack gap={4}>
            <Text color={"fg.muted"}>{t("languages.dialogDescription")}</Text>
            <RadioGroup
              value={language}
              onValueChange={(event) => changeLanguage(event.value as Language)}
            >
              <Stack
                maxH={{ base: "min(360px, calc(100dvh - 220px))", md: "360px" }}
                overflowY="auto"
                pr={1}
              >
                {supportedLanguages.map((languageCode) => (
                  <Box
                    key={languageCode}
                    borderRadius={"md"}
                    px={3}
                    py={2}
                    bgColor={
                      language === languageCode ? "bg.muted" : "transparent"
                    }
                  >
                    <Radio value={languageCode}>
                      <HStack justifyContent={"space-between"} width={"100%"}>
                        <Text>{t(`languages.${languageCode}`)}</Text>
                        <Text color={"fg.muted"} textStyle={"sm"}>
                          {languageCode.toUpperCase()}
                        </Text>
                      </HStack>
                    </Radio>
                  </Box>
                ))}
              </Stack>
            </RadioGroup>
          </Stack>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default LanguageDialogGlobal;
