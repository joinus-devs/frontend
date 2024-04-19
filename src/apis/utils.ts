import { UrlBuilder } from ".";
import { ApiError } from "./types";

const domain = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

export const getDomain = (url: string, protoc = "http") => {
  return `${protoc}://${domain}${url ? `/${url}` : ""}`;
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
    const queryString = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (Array.isArray(value))
        value.forEach((v) => queryString.append(key, v));
      else queryString.append(key, value);
    });
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
      headers: {
        Authorization: localStorage.getItem("login-token") || "",
      },
      body,
    });
  },
};

export const buildUrl = <T>(url: UrlBuilder<T>, data: T) => {
  return typeof url === "function" ? url(data) : url;
};
