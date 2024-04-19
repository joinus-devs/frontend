import { signInSocial } from "@/apis/auth";
import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

interface SignInSocialData {
  id: number | string;
  type: string;
}

const useSocialLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const code = router.query.code;
  const state = router.query.state;

  const { mutate: SocialLogin, data: signInGoogle } = useMutation({
    mutationFn: ({ id, type }: SignInSocialData) => signInSocial(id, type),
    onSuccess: (data) => {
      localStorage.setItem("login-token", data.token);
      router.push("/");
      queryClient.invalidateQueries({ queryKey: [toUrl(ApiRoutes.Me)] });
    },
    onError: (error, data) => {
      const { id, type } = data;
      router.push({
        pathname: "/auth/register/social",
        query: {
          socialId: id,
          type: type,
        },
      });
    },
  });

  const handleSocialLogin = ({ id, type }: SignInSocialData) => {
    SocialLogin({ id, type });
  };

  return { handleSocialLogin };
};

export default useSocialLogin;
