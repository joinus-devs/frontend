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
