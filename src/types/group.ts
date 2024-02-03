import { Nullable } from "./common";

export interface Group {
  id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  name: string;
  description: string;
  capacity: number;
  sex: boolean;
  minimum_age: number;
  maximum_age: number;
  categories: string[];
  imgSrc?: string;
}

export interface Feed {
  club_id: number;
  content: string;
  created_at: string;
  deleted_at: Nullable<string>;
  id: number;
  title: string;
  updated_at: string;
  user: {
    created_at: string;
    deleted_at: Nullable<string>;
    email: string;
    id: number;
    name: string;
    phone: string;
    sex: boolean;
    social_id: string;
    updated_at: string;
  };
  user_id: number;
}
