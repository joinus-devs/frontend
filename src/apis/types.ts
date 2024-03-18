import { Optional } from "@/types";
import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface ApiResponse<T> {
  status: number;
  code: number;
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

export type InfiniteQueryOptions<
  T,
  S = CursorQueryResponse<T>,
> = UseInfiniteQueryOptions<S, ApiError, S, S, QueryKey, number>;
