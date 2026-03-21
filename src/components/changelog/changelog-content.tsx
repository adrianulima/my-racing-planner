import { useDialogTracking } from "@/hooks/useDialogTracking";
import { setChangelogRead } from "@/store/notifications";
import { EDialogs } from "@/store/ui";
import { Heading, List, Text } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import { useEffect } from "react";

function ChangelogContent() {
  useDialogTracking(EDialogs.Changelog);
  useEffect(() => {
    setChangelogRead();
  }, []);
  return (
    <Markdown
      options={{
        overrides: {
          h1: { component: "h1", props: { hidden: true } },
          h2: { component: Heading, props: { size: "md", mt: 2 } },
          p: { component: Text },
          ul: { component: List.Root },
          li: { component: List.Item },
        },
      }}
    >
      {CHANGELOG}
    </Markdown>
  );
}

export default ChangelogContent;
