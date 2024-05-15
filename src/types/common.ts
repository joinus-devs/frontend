export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type timer = {
  id: number;
  created_at?: string;
  updated_at?: Nullable<string>;
  deleted_at?: string;
};

export type imgs = {
  url: string;
  type: string;
};

export type InfiniteResponse<T> = {
  status: number;
  data: {
    next: number;
    data: T[];
  };
  message: string;
};

export type WithPage<T> = {
  data: T[];
  next?: number;
};
