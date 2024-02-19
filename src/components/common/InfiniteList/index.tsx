import { ApiError, CursorQueryResponse } from "@/apis";
import { Box } from "@chakra-ui/react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";

interface InfiniteListProps<T> {
  infiniteQueryResult: UseInfiniteQueryResult<
    InfiniteData<CursorQueryResponse<T[]>, unknown>,
    ApiError
  >;
  renderItem: ({ data }: { data: T }) => JSX.Element;
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
}: InfiniteListProps<T>) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage } = infiniteQueryResult;

  const flattenData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data);
  }, [data]);

  useEffect(() => {
    // intersectionObserver
    const observerElement = observerRef.current;

    if (!observerElement) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("fetchNextPage");
        fetchNextPage();
      }
    });
    observer.observe(observerElement);

    return () => observer.disconnect();
  }, [fetchNextPage]);

  return (
    <>
      {flattenData?.map((data, index) => (
        <Item key={`feed_${index}`} data={data} />
      ))}
      <Box ref={observerRef} />
    </>
  );
};

export default InfiniteList;
