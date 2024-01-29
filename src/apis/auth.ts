import { toUrl } from "@/utils";
import { usePost } from "./hooks";
import { ApiRoutes } from "@/constants";

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  token: string;
}

export const useSignin = (id?: number) => {
  return usePost<SigninRequest, SigninResponse>(
    toUrl(ApiRoutes.SignIn, { id })
  );
};
