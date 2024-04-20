import {
  Center,
  Flex,
  ListItem,
  Spacer,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

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
  const totalSize = virtualizer.getTotalSize();

  useEffect(() => {
    if (!isLoading) return;

    const observer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(observer);
  }, [dataFromApi, isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    const container = parentRef.current;
    if (!container) return;

    container.scrollTo(0, container.scrollHeight);
  }, [isLoading, totalSize]);

  useEffect(() => {
    if (isLoading) return;

    const container = parentRef.current;
    if (!container || isFetching) return;

    const currentScrollHeight = container.scrollHeight;
    container.scrollTo(0, currentScrollHeight - prevScrollHeight.current);
    prevScrollHeight.current = currentScrollHeight;
  }, [dataFromApi, isFetching, isLoading]);

  // 데이터가 변경될 때, 스크롤 위치가 제일 아래에 있다면, 스크롤을 내림
  useEffect(() => {
    const container = parentRef.current;
    if (!container) return;

    const delta =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    const isBottom = delta < 200;
    if (isBottom) {
      container.scrollTo(0, container.scrollHeight);
    }
  }, [dataFromSocket]);

  const concatData = useMemo(() => {
    const data = dataFromApi.concat(dataFromSocket);
    return data;
  }, [dataFromApi, dataFromSocket]);

  return (
    <Flex pos={"relative"}>
      {isLoading && (
        <Center
          pos={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={9999}
          bgColor={"blackAlpha.600"}
          flexDirection={"column"}
          gap={"4"}
        >
          <Spinner color="white" />
          <Text fontSize={"lg"} color={"white"}>
            채팅 내역을 불러오는 중입니다...
          </Text>
        </Center>
      )}
      <Flex
        ref={parentRef}
        p={2}
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
    </Flex>
  );
};

export default VirtualListReverse;
