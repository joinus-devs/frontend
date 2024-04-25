import { timer } from ".";

export interface User extends timer {
  name: string;
  sex: boolean;
  phone: string;
  email: string;
  social_id: string;
  role?: string;
  exp?: number;
  type?: string;
  profile: string;
  birth: string;
}
