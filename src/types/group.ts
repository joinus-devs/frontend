import { User } from ".";
import { timer } from ".";

export interface Group extends timer {
  name: string;
  description: string;
  capacity: number;
  sex: boolean;
  minimum_age: number;
  maximum_age: number;
  categories: string[];
  imgSrc?: string;
}

export interface Feed extends timer {
  club_id: number;
  content: string;
  title: string;
  user: User;
  user_id: number;
}

export interface FeedInGroup extends timer {
  title: string;
  content: string;
  user_id: number;
  club_id: number;
  user: User;
  comments: Comment[];
}

export interface Comment extends timer {
  content: string;
  feed_id: number;
  user_id: number;
  user: User;
}
