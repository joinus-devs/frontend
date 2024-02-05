import { ApiRoutes, PageRoutes } from "@/constants";
import { compile } from "path-to-regexp";

export const toUrl = (path: ApiRoutes | PageRoutes, params?: object) =>
  compile(path, { encode: encodeURIComponent })(params);
