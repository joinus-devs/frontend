export interface Group {
  id?: number;
  name: string;
  category: string;
  maxParticipants: number;
  participants?: number;
  description: string;
  Age: [number, number];
  createdAt?: string;
  updatedAt?: string;
}

export interface SetGroupProps {
  setGroup: React.Dispatch<React.SetStateAction<Group>>;
  group: Group;
}
