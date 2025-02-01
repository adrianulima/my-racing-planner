import { For, Table } from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { useScroll } from "../app/useScroll";
import InfinityTableEmpty from "./infinity-table-empty";
import InfinityTableLoading from "./infinity-table-loading";

type Dict<T = any> = Record<string, T>;
function InfinityTable<T extends string | number | Dict | undefined>({
  list,
  rows,
  children,
}: PropsWithChildren<{
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
}>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const { onScroll } = useScroll();

  const pageSize = 20;
  const loading = page * pageSize < (list?.length ?? 0);
  const each = useMemo(
    () => list?.slice(0, Math.min(list.length, page * pageSize)),
    [list, page],
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    onScroll(event);
    const scroll =
      (event.currentTarget.scrollTop +
        (event.currentTarget.clientHeight ?? 0)) /
      event.currentTarget.scrollHeight;

    const over = page * pageSize > (list?.length ?? 0);
    if (!over && scroll > 0.8) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const over = page * pageSize > (list?.length ?? 0);
    if (
      !over &&
      (scrollRef.current?.scrollHeight ?? 0) <=
        (scrollRef.current?.clientHeight ?? 0)
    ) {
      setPage((prev) => prev + 1);
    }
  }, [page]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [list]);

  return (
    <Table.ScrollArea
      width="100%"
      borderRadius={"md"}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <Table.Root stickyHeader size="sm" striped>
        <Table.Header>{children}</Table.Header>
        <Table.Body>
          <For fallback={<InfinityTableEmpty />} each={each} children={rows} />
          {loading && <InfinityTableLoading />}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}

export default InfinityTable;
