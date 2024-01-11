export interface Group {
  id?: number;
  name: string;
  category: string;
  participants?: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GroupOptions {
  minAge: number;
  maxAge: number;
  maxParticipants: number;
}
