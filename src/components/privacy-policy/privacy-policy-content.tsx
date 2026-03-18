import { useDialogTracking } from "@/hooks/useDialogTracking";
import { setPrivacyPolicyRead } from "@/store/notifications";
import { EDialogs } from "@/store/ui";
import { Heading, Link, List, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Tooltip } from "../ui/tooltip";

export const PRIVACY_VERSION = "Wed 15 Jan, 2025";

function PrivacyPolicyContent() {
  useDialogTracking(EDialogs.PrivacyPolicy);
  useEffect(() => { setPrivacyPolicyRead(); }, []);
  return (
    <>
      <Text textAlign={"center"} as="p">
        Last updated {PRIVACY_VERSION}
      </Text>
      <section>
        <Heading>Collected Data</Heading>
        <Text as="p">
          I do not collect or store any personal or sensitive data from users.
        </Text>
      </section>

      <section>
        <Heading mt={2}>LocalStorage</Heading>
        <Text as="p">
          This site uses your browser's localStorage to save UI settings like
          theme and also the tracks and cars marked as owned or wished.
        </Text>
        <Text my={2} as="p">
          This data is stored locally on your device and is not sent to the
          servers or shared with any third parties.
        </Text>
      </section>

      <section>
        <Heading mt={2}>Google Analytics</Heading>
        <Text as="p">I use Google Analytics to track:</Text>

        <List.Root>
          <List.Item>
            <strong>Page visits</strong> (Used to track the amount of visits the
            site receives)
          </List.Item>
          <List.Item>
            <strong>Outbound clicks</strong> (e.g., clicks on the "Checkout"
            button leading to the iRacing.com store page)
          </List.Item>
        </List.Root>
        <Text my={2} as="p">
          Google Analytics collects only aggregated and anonymized data. This
          information is used solely to understand how our site is being used
          and to improve the user experience.
        </Text>
      </section>

      <section>
        <Heading mt={2}>Third-Party Links</Heading>
        <Text as="p">
          This site contains a link to a third-party website (iRacing.com). Once
          leaving this site, the privacy practices and content of the external
          website are not controlled or managed by this site.
        </Text>
      </section>

      <section>
        <Heading mt={2}>Your Choices</Heading>
        <Text as="p">
          You can control your localStorage data by clearing your browser's
          cache.
        </Text>
        <Text my={2} as="p">
          To opt out of Google Analytics tracking, you can use the Google
          Analytics Opt-out Browser Add-on.
        </Text>
      </section>

      <section>
        <Heading mt={2}>Contact</Heading>
        <Text as="p">
          If you have any questions about this Privacy Policy, please contact me
          by{" "}
          <Tooltip
            lazyMount
            unmountOnExit
            content={"adrianulima@gmail.com"}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
          >
            <Link
              href="mailto:adrianulima@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              email
            </Link>
          </Tooltip>{" "}
          or create an issue at the{" "}
          <Link
            href="https://github.com/adrianulima/my-racing-planner"
            target="_blank"
            rel="noreferrer"
          >
            Github repository
          </Link>
          .
        </Text>
      </section>
    </>
  );
}

export default PrivacyPolicyContent;
