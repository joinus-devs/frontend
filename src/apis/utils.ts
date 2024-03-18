import { ApiError } from "./types";

const protoc = "http";
const domain = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

export const getDomain = (url: string) => {
  return `${protoc}://${domain}/${url}`;
};

const extendedFetch = async (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, init).then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new ApiError(res.status, data.message);
    return data;
  });
};

type Api = {
  get: <T>(url: string, params?: object) => Promise<T>;
  post: <T>(url: string, body?: object) => Promise<T>;
  put: <T>(url: string, body?: object) => Promise<T>;
  patch: <T>(url: string, body?: object) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
  postForm: <T>(url: string, body?: FormData) => Promise<T>;
};

export const api: Api = {
  get: (url, params) => {
    const queryString = new URLSearchParams(params as Record<string, string>);
    return extendedFetch(`${getDomain(url)}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token") || "",
      },
    });
  },
  post: (url, body) => {
    return extendedFetch(`${getDomain(url)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token") || "",
      },
      body: JSON.stringify(body),
    });
  },
  put: (url, body) => {
    return extendedFetch(`${getDomain(url)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token") || "",
      },
      body: JSON.stringify(body),
    });
  },
  patch: (url, body) => {
    return extendedFetch(`${getDomain(url)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token") || "",
      },
      body: JSON.stringify(body),
    });
  },
  delete: (url) => {
    return extendedFetch(`${getDomain(url)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token") || "",
      },
    });
  },
  postForm: (url, body) => {
    return extendedFetch(`${getDomain(url)}`, {
      method: "POST",
      body,
    });
  },
};

export const makeFormBody = (obj: object) => {
  const formBody = Object.entries(obj).map(([key, value]) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    return encodedKey + "=" + encodedValue;
  });
  const joined = formBody.join("&");
  return joined;
};
