import { ApiError, CursorQueryResponse } from "@/apis";
import {
  Box,
  Center,
  Flex,
  FlexProps,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";
import { EmptyDataPlaceholder } from "..";

interface WindowVirtualListProps<T> {
  infiniteQueryResult: UseInfiniteQueryResult<
    InfiniteData<CursorQueryResponse<T[]>, unknown>,
    ApiError
  >;
  renderItem: ({ data }: { data: T }) => JSX.Element;
  gap?: FlexProps["gap"];
}

const WindowVirtualList = <T,>({
  infiniteQueryResult,
  renderItem: Item,
  gap = 0,
}: WindowVirtualListProps<T>) => {
  const { data, fetchNextPage, isFetching } = infiniteQueryResult;
  const parentRef = useRef<HTMLDivElement>(null);

  const flattenData = useMemo(() => {
    return (data?.pages ?? []).map((page) => page.data).flat();
  }, [data]);

  const virtualizer = useWindowVirtualizer({
    count: flattenData.length,
    estimateSize: () => 40,
    scrollMargin: parentRef.current?.offsetTop,
    initialOffset: 0,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...items].reverse();
    if (lastItem && lastItem.index >= flattenData.length - 1) {
      fetchNextPage();
    }
  }, [fetchNextPage, flattenData.length, items]);
  return (
    <>
      <Flex
        ref={parentRef}
        minH={virtualizer.getTotalSize()}
        position={"relative"}
      >
        {items.map((item) => (
          <Box
            key={item.key}
            data-index={item.index}
            ref={virtualizer.measureElement}
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            transform={`translateY(${item.start - virtualizer.options.scrollMargin}px)`}
          >
            <Item data={flattenData[item.index]} />
            <Spacer h={gap} />
          </Box>
        ))}
      </Flex>
      {isFetching && (
        <Center minH={20}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
      {items && !items.length && !isFetching && (
        <EmptyDataPlaceholder message="피드가" />
      )}
    </>
  );
};

export default WindowVirtualList;
