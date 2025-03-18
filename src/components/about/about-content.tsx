import { useDialogTracking } from "@/hooks/useDialogTracking";
import { EDialogs } from "@/store/ui";
import { For, Heading, Link, List, Text } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

const contributors = [
  { name: "Adriano Lima", github: "adrianulima" },
  { name: "Juni Lima", github: "junilima" },
  { name: "Daniel López", github: "raikwallace" },
];

function AboutContent() {
  useDialogTracking(EDialogs.About);
  return (
    <>
      <section>
        <Heading>Data Updates</Heading>
        <Text as="p">
          The content on this site is updated at the beginning of every iRacing
          season. All data is fetched directly from the iRacing public API.
        </Text>
        <Text as="p" mt={2}>
          For detailed update history, visit the Change Log.
        </Text>
      </section>

      <section>
        <Heading mt={2}>Feedback and Suggestions</Heading>
        <Text as="div">
          Your feedback will be highly appreciated! If you have any suggestions
          or encounter issues, please consider opening an issue at the{" "}
          <Link
            href="https://github.com/adrianulima/my-racing-planner"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository
          </Link>{" "}
          or send me an{" "}
          <Tooltip
            lazyMount
            unmountOnExit
            content={"adrianulima@gmail.com"}
            showArrow
            positioning={{ placement: "bottom" }}
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
          </Tooltip>
          .
        </Text>
      </section>

      <section>
        <Text my={2} fontWeight={"bold"} as="p">
          This project is not affiliated with or endorsed by iRacing.com.
        </Text>
      </section>

      <section>
        <Heading mt={2}>The Creator</Heading>
        <Text as="p">
          My name is <strong>Adriano Lima</strong>, I am from Brazil and have
          been passionate about sim racing since 2010. I started with rFactor
          and later explored other simulators until I finally gave iRacing a
          chance in 2020. Sim racing has always been a hobby for me, but
          recently, I've been working to improve my driving techniques.
        </Text>
        <Text as="p" my={2}>
          As a software developer, I've always enjoyed exploring iRacing APIs.
          In the past, I created a Twitch bot and an Overlay prototype, and now
          I'm excited to present this project. Every season, I find myself
          wondering which tracks and cars to purchase. This tool was initially
          designed to address my own needs, but I hope it will also be helpful
          to the broader iRacing community.
        </Text>
      </section>

      <section>
        <Heading mt={2}>Contributors</Heading>
        <Text as="p">
          This project would not have been possible without the help and support
          of the following contributors:
        </Text>
        <List.Root>
          <For
            each={contributors}
            children={(c) => (
              <List.Item
                key={c.github}
                fontWeight={c.github === "adrianulima" ? "bold" : undefined}
              >
                {c.name} (
                <Link
                  href={`https://github.com/${c.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{c.github}
                </Link>
                )
              </List.Item>
            )}
          />
        </List.Root>
      </section>
    </>
  );
}

export default AboutContent;
