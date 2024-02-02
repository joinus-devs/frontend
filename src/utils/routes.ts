import { ApiRoutes } from "@/constants";
import { compile } from "path-to-regexp";

export const toUrl = (path: ApiRoutes, params?: object) =>
  compile(path, { encode: encodeURIComponent })(params);
