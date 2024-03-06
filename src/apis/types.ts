import { Nullable, Optional } from "@/types";
import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

export class ApiError extends Error {
  private _status: number;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

export type Scheme = {
  id: number;
  created_at?: string;
  updated_at?: Nullable<string>;
  deleted_at?: string;
};

export type CursorQueryParams = {
  limit: number;
};

export interface PageQueryResponse<T> {
  total: number;
  data: T;
}

export interface CursorQueryResponse<T> {
  previous: number;
  next: number;
  data: T;
}

export type QueryKey = [string, Optional<object>];

export type QueryOptions<T> = UseQueryOptions<T, ApiError, T, QueryKey>;

export type PageQueryOptions<T, S = PageQueryResponse<T>> = UseQueryOptions<
  S,
  ApiError,
  S,
  QueryKey
>;

export type InfiniteQueryOptions<T, S = CursorQueryResponse<T>> = Omit<
  UseInfiniteQueryOptions<
    S,
    ApiError,
    InfiniteData<S>,
    S,
    QueryKey,
    Nullable<number>
  >,
  | "queryKey"
  | "queryFn"
  | "initialPageParam"
  | "getPreviousPageParam"
  | "getNextPageParam"
>;

export type UrlBuilder<T> = string | ((data: T) => string);
