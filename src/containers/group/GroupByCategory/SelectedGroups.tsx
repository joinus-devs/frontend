import { useGetGroupByCategory } from "@/apis";
import { WindowVirtualList } from "@/components";
import { GroupCard } from "@/containers";

interface SelectedGroupsProps {
  id: number;
}

const SelectedGroups = ({ id }: SelectedGroupsProps) => {
  return (
    <WindowVirtualList
      infiniteQueryResult={useGetGroupByCategory(id, { limit: 10 })}
      renderItem={GroupCard}
      emptyDataMessage="생성된 클럽이 없습니다. 첫번째로 클럽을 생성해보세요!"
      gap={"4"}
    />
  );
};

export default SelectedGroups;
