import { imgs } from "@/types";
import { Flex } from "@chakra-ui/react";

import Image from "next/image";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
interface SubImagesProps {
  imgs: imgs[];
}

const SubImages = ({ imgs }: SubImagesProps) => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const onDragStart: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!ref.current) return;
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + ref.current.scrollLeft);
  }, []);

  const onDragMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!isDrag || !ref.current) return;
      const newScrollX = startX - e.pageX;
      ref.current.scrollLeft = newScrollX;
    },
    [isDrag, startX]
  );

  const onDragEnd = useCallback(() => {
    setIsDrag(false);
  }, []);

  return (
    <Flex
      p={1}
      gap={2}
      bgColor={"white"}
      pt={0}
      overflowX={"auto"}
      _hover={{
        cursor: ref?.current?.scroll ? "pointer" : "default",
      }}
      ref={ref}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseLeave={onDragEnd}
      onMouseUp={onDragEnd}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {imgs.map((img, index) => (
        <Flex
          key={index}
          minW={36}
          maxW={36}
          h={36}
          overflow={"hidden"}
          position={"relative"}
          boxShadow={"md"}
        >
          <Image src={img.url} alt={"subimg"} fill />
        </Flex>
      ))}
    </Flex>
  );
};

export default SubImages;
