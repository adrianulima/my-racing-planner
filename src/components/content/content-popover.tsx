import { useIr } from "@/store/ir";
import { For, Table, Text } from "@chakra-ui/react";
import CARS_JSON from "../../ir-data/cars.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import ContentCheckbox from "./content-checkbox";

function ContentPopover({
  content,
  list,
}: {
  content: "cars" | "tracks";
  list: number[];
}) {
  const contentList: any = content === "cars" ? CARS_JSON : TRACKS_JSON;
  const { wishCars, wishTracks, myCars, myTracks } = useIr();
  const [wishes, myContent] =
    content === "cars" ? [wishCars, myCars] : [wishTracks, myTracks];

  return (
    <Table.ScrollArea width="100%" maxH={"320px"}>
      <Table.Root size="sm" striped>
        <Table.Body fontSize={"xs"}>
          <For
            each={list}
            children={(item: number) => {
              const contentItem =
                contentList[item.toString() as keyof typeof contentList];
              return (
                contentItem && (
                  <Table.Row bgColor={"transparent"} key={item}>
                    <Table.Cell w={"20px"} p={0} borderBottom={0} px={"4px"}>
                      <ContentCheckbox
                        size={"xs"}
                        mt={"4px"}
                        content={content}
                        contentId={contentItem.id}
                        sku={contentItem.sku}
                        free={contentItem.free}
                        owned={myContent.includes(contentItem?.sku)}
                        wish={
                          !myContent.includes(contentItem?.sku) &&
                          wishes.includes(contentItem?.sku)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell
                      width={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                      p={0}
                      borderBottom={0}
                      px={"4px"}
                      fontWeight={"bold"}
                      maxW={"284px"}
                    >
                      <Text truncate>{contentItem.name}</Text>
                    </Table.Cell>
                  </Table.Row>
                )
              );
            }}
          />
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}

export default ContentPopover;
