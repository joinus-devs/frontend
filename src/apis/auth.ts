import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { usePost } from "./hooks";

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  token: string;
}

export const useSignin = (id?: number) => {
  return usePost<SigninRequest, SigninResponse>(
    toUrl(ApiRoutes.SignIn, { id }),
    {
      onSuccess: (res) => {
        localStorage.setItem("login-token", res.data.token);
      },
    }
  );
};
