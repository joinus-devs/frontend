import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import {
  MutationOptions,
  QueryFunctionContext,
  useInfiniteQuery as _useInfiniteQuery,
  useQuery as _useQuery,
  useMutation,
} from "@tanstack/react-query";
import {
  ApiError,
  ApiResponse,
  CursorQueryResponse,
  InfiniteQueryOptions,
  PageQueryResponse,
  QueryKey,
  QueryOptions,
  UrlBuilder,
} from "./types";
import { api, buildUrl } from "./utils";

const fetcher = async <T>(context: QueryFunctionContext<QueryKey>) => {
  const { queryKey } = context;
  const [url, params] = queryKey;
  const res = await api.get<ApiResponse<T>>(url, params);
  return res.data;
};

/**
 * T = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param params 요청할 url에 붙일 query params
 * @param options query options (ex. onSuccess, onError, onSettled)
 * @returns
 */
export const useFetch = <T>(
  url: string,
  params?: object,
  options?: QueryOptions<T>
) => {
  return _useQuery<T, ApiError, T, QueryKey>({
    queryKey: [url!, params],
    queryFn: fetcher,
    enabled: !!url,
    ...options,
  });
};

export const _useFetch = <T>(
  url: string,
  params?: object,
  options?: QueryOptions<T>
) => {
  return _useQuery<T, ApiError, T, QueryKey>({
    queryKey: [url!, params],
    queryFn: fetcher,
    enabled: false,
    ...options,
  });
};
/**
 * T = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param params 요청할 url에 붙일 query params
 * @param options query options (ex. onSuccess, onError, onSettled)
 * @returns
 */
export const useGetPage = <T, S = PageQueryResponse<T>>(
  url: string,
  params?: object,
  options?: QueryOptions<S>
) => {
  return _useQuery<S, ApiError, S, QueryKey>({
    queryKey: [url!, params],
    queryFn: fetcher,
    enabled: !!url,
    ...options,
  });
};

export const useLoadMore = <T>(
  url: string,
  params?: object,
  options?: InfiniteQueryOptions<T>
) => {
  return _useInfiniteQuery({
    queryKey: [url!, params],
    queryFn: async (context) => {
      const { queryKey, pageParam } = context;
      const [url, params] = queryKey;
      const res = await api.get<ApiResponse<CursorQueryResponse<T>>>(url, {
        ...params,
        cursor: pageParam,
      });
      return res.data;
    },
    initialPageParam: null,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    getNextPageParam: (lastPage) => lastPage.next,
    ...options,
  });
};

/**
 * T = 요청 보낼때 body의 타입
 * S = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param options mutation options (ex. onSuccess, onError, onSettled)
 * @returns
 */
export const usePost = <T = object, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) => api.post<ApiResponse<S>>(url, data ?? undefined),
    ...options,
  });
};

export const usePostFormData = <T = FormData, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) => api.postForm<ApiResponse<S>>(url, data as FormData),
    ...options,
  });
};

export const usePostForm = <TOld, TNew extends FormData, TRes = unknown>(
  url: UrlBuilder<TNew>,
  params?: object,
  options?: MutationOptions<TRes, TNew>,
  updater?: (old: TOld, data: TNew) => TOld
) => {
  return useMutation<TOld, TNew, ApiResponse<TRes>>(
    (data) =>
      data
        ? api.postForm<ApiResponse<TRes>>(buildUrl(url, data), data)
        : api.postForm<ApiResponse<TRes>>(buildUrl(url, data)),
    options,
    [url, params],
    updater
  );
};

/**
 * T = 요청 보낼때 body의 타입
 * S = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param options mutation options (ex. onSuccess, onError, onSettled)
 * @returns
 */
export const useUpdate = <T = object, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) => api.put<ApiResponse<S>>(url, data ?? undefined),
    ...options,
  });
};

/**
 * T = 요청 보낼때 데이터 타입 (대부분의 경우 id)
 * S = 서버에서 받아올 데이터의 타입
 * @param url 요청할 url
 * @param options mutation options (ex. onSuccess, onError, onSettled)
 * @returns
 */
export const useDelete = <T = number | undefined, S = unknown>(
  url: string,
  options?: MutationOptions<ApiResponse<S>, unknown, T>
) => {
  return useMutation<ApiResponse<S>, unknown, T>({
    mutationFn: (data) =>
      api.delete<ApiResponse<S>>(toUrl(url as ApiRoutes, { id: data })),
    ...options,
  });
};
