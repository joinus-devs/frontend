import { Nullable } from ".";

export interface User {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: Nullable<string>;
  name: string;
  sex: boolean;
  phone: string;
  email: string;
  social_id: string;
}
