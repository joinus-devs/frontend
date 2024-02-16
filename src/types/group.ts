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
  is_private: boolean;
  comment_count: number;
  club?: Group;
}

export interface Comment extends timer {
  content: string;
  feed_id: number;
  user_id: number;
  user: User;
}

export interface FeedWithPage {
  next: number;
  data: Feed[];
}

export interface CommentWithPage {
  next: number;
  data: Comment[];
}
