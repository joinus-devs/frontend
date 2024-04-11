import { Flex, ListItem, Spacer, UnorderedList } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";

interface VirtualListReverseProps<T> {
  dataFromApi: T[];
  dataFromSocket: T[];
  isFetching: boolean;
  fetchNextPage: () => void;
  renderItem: ({ data }: { data: T }) => JSX.Element;
  gap?: number;
}

const VirtualListReverse = <T,>({
  dataFromApi,
  dataFromSocket,
  isFetching,
  fetchNextPage,
  renderItem: Item,
  gap = 0,
}: VirtualListReverseProps<T>) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: dataFromApi.length + dataFromSocket.length,
    estimateSize: () => 40,
    getScrollElement: () => parentRef.current,
  });

  const items = virtualizer.getVirtualItems();

  const translateY = useMemo(
    () => items[0]?.start - virtualizer.options.scrollMargin,
    [items, virtualizer.options.scrollMargin]
  );

  const prevScrollHeight = useRef(0);

  useEffect(() => {
    const container = parentRef.current;
    if (!container || isFetching) return;
    const currentScrollHeight = container.scrollHeight;
    if (prevScrollHeight.current === currentScrollHeight) return;
    container.scrollTop = currentScrollHeight - prevScrollHeight.current;
    prevScrollHeight.current = currentScrollHeight;
  }, [dataFromApi, isFetching]);

  // 데이터가 변경될 때, 스크롤 위치가 제일 아래에 있다면, 스크롤을 내림
  useEffect(() => {
    const container = parentRef.current;
    if (!container || isFetching) return;

    const delta =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    const isBottom = delta < 200;
    console.log("delta", delta);
    console.log(
      "scrollHeight",
      container.scrollHeight,
      "scrollTop",
      container.scrollTop,
      "clientHeight",
      container.clientHeight
    );
    if (isBottom) {
      container.scrollTo(0, container.scrollHeight);
    }
  }, [dataFromSocket, isFetching]);

  const concatData = useMemo(() => {
    const data = dataFromApi.concat(dataFromSocket);
    return data;
  }, [dataFromApi, dataFromSocket]);

  return (
    <Flex
      ref={parentRef}
      h={1050}
      direction={"column"}
      w={"100%"}
      overflowY={"auto"}
      onWheel={(e) => {
        if (isFetching) return;

        const container = parentRef.current;
        if (!container) return;

        const isTop = container.scrollTop < 400;
        if (e.deltaY < 0 && isTop) {
          fetchNextPage();
        }
      }}
    >
      <Flex minH={virtualizer.getTotalSize()} position={"relative"}>
        <UnorderedList
          pos={"absolute"}
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          listStyleType={"none"}
          m={"0"}
          transform={`translateY(${translateY}px)`}
        >
          {items.map((item) => (
            <ListItem
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
            >
              <Item data={concatData[item.index]} />
              <Spacer h={gap} />
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Flex>
  );
};

export default VirtualListReverse;
