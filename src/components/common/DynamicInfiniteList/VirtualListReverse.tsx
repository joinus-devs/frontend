import { ApiError, CursorQueryResponse } from "@/apis";
import { Box, Center, Flex, Spacer, Spinner } from "@chakra-ui/react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";
import { EmptyDataPlaceholder } from "..";

interface VirtualListReverseProps<T> {
  infiniteQueryResult: UseInfiniteQueryResult<
    InfiniteData<CursorQueryResponse<T[]>, unknown>,
    ApiError
  >;
  renderItem: ({ data }: { data: T }) => JSX.Element;
  gap?: number;
}

const VirtualListReverse = <T,>({
  infiniteQueryResult,
  renderItem: Item,
  gap = 0,
}: VirtualListReverseProps<T>) => {
  const { data, fetchNextPage, isFetching } = infiniteQueryResult;
  const parentRef = useRef<HTMLDivElement>(null);

  const flattenData = useMemo(() => {
    const flattened = (data?.pages ?? []).map((page) => page.data).flat();
    return flattened.reverse();
  }, [data]);

  console.log("flattenData변경", flattenData);
  const virtualizer = useVirtualizer({
    count: flattenData.length,
    estimateSize: () => 40,
    getScrollElement: () => parentRef.current,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...items];
    if (lastItem && lastItem.index >= flattenData.length - 1) {
      console.log("fetchNextPage", lastItem.index, flattenData.length - 1);
      fetchNextPage();
    }
  }, [fetchNextPage, flattenData.length, items]);

  useEffect(() => {
    if (parentRef.current && flattenData.length > 0) {
      parentRef.current.scrollTop = parentRef.current.scrollHeight;
    }
  }, [flattenData.length]);

  return (
    <>
      <Flex
        ref={parentRef}
        overflowY={"auto"}
        height={1050}
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
    </>
  );
};

export default VirtualListReverse;
