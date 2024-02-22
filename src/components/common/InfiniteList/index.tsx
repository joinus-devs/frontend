import { ApiError, CursorQueryResponse } from "@/apis";
import { useVirtualize } from "@/hooks";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

interface InfiniteListProps<T> {
  infiniteQueryResult: UseInfiniteQueryResult<
    InfiniteData<CursorQueryResponse<T[]>, unknown>,
    ApiError
  >;
  renderItem: ({ data }: { data: T }) => JSX.Element;
  gap?: number;
}

/**
 * InfiniteList: 무한 스크롤을 위한 컴포넌트
 * @param inifiniteQueryResult this is the result of useInfiniteQuery
 * @param renderItem this is the component that will be rendered for each item
 * @returns
 */

const InfiniteList = <T,>({
  infiniteQueryResult,
  renderItem: Item,
  gap = 0,
}: InfiniteListProps<T>) => {
  const [itemHeight, setItemHeight] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, isFetching } = infiniteQueryResult;

  const flattenData = useMemo(() => {
    return (data?.pages ?? []).map((page) => page.data).flat();
  }, [data]);

  const { containerHeight, startIndex, endIndex } = useVirtualize({
    container: typeof window !== "undefined" ? window : null,
    numItems: flattenData.length,
    itemHeight,
    gap,
    marginTop: containerRef.current?.offsetTop ?? 0,
  });

  const items = useMemo(() => {
    if (!flattenData.length) return;
    return flattenData.slice(startIndex, endIndex).map((item, idx) => (
      <Box
        key={idx}
        pos={"absolute"}
        top={0}
        left={0}
        right={0}
        transform={`translateY(${
          (startIndex + idx) * itemHeight + (startIndex + idx) * gap
        }px)`}
      >
        <Item data={item} />
      </Box>
    ));
  }, [Item, endIndex, flattenData, gap, itemHeight, startIndex]);

  useEffect(() => {
    const observerElement = observerRef.current;

    if (!observerElement) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    observer.observe(observerElement);

    return () => observer.disconnect();
  }, [fetchNextPage]);

  useEffect(() => {
    if (items && items.length === 0) return;
    const firstItem = containerRef.current?.firstChild?.firstChild;

    if (!(firstItem instanceof HTMLElement)) return;
    setItemHeight(firstItem.clientHeight);
  }, [items]);

  return (
    <>
      <Flex
        ref={containerRef}
        direction={"column"}
        gap={gap}
        position={"relative"}
        minH={containerHeight}
      >
        {items}
      </Flex>
      <Box ref={observerRef} />
      {isFetching && (
        <Center minH={20}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
    </>
  );
};

export default InfiniteList;
