import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePost } from "./hooks";
import { ApiResponse } from "./types";
import { getDomain } from "./utils";
import { createStandaloneToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

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

export interface UserData {
  email: string;
  name: string;
  birth: string;
  phone: string;
  sex: boolean;
  social_id?: string;
  type?: string;
  password?: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  id?: number;
  profile?: string;
}

interface KakaoToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

interface KakaoInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      nickname: string;
    };
  };
}
interface GoogleToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}
interface GoogleInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface NaverToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

interface NaverInfo {
  id: string;
  nickname: string;
  profile_image: string;
  age: string;
  gender: string;
  email: string;
  mobile: string;
  mobile_e164: string;
  name: string;
  birthday: string;
  birthyear: string;
}

interface SignInSocialData {
  id: number | string;
  type: string;
}

type IssueKakaoToken = (code: string | string[]) => Promise<KakaoToken>;
type IssueGoogleToken = (code: string | string[]) => Promise<GoogleToken>;
type IssueNaverToken = (
  code?: string | string[],
  state?: string | string[]
) => Promise<NaverToken>;
type GetKakaoId = (token?: string) => Promise<KakaoInfo>;
type GetGoogleId = (token?: string) => Promise<GoogleInfo>;
type getNaverId = (token?: string) => Promise<NaverInfo>;
type getUserInfo = () => Promise<UserData>;
type postProfileImg = (formData: FormData) => Promise<string>;

const { toast } = createStandaloneToast();

// kakao
export const issueKakaoToken: IssueKakaoToken = async (code) => {
  const response = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${code}`,
  }).then((res) => res.json());
  return response;
};

export const getKakaoId: GetKakaoId = async (token) => {
  const response = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  }).then((res) => res.json());
  return response as KakaoInfo;
};

//google

export const issueGoogleToken: IssueGoogleToken = async (code) => {
  const response = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: `code=${code}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
  }).then((res) => res.json());

  return response;
};

export const getGoogleId: GetGoogleId = async (token) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());
  return response;
};

// naver
export const issueNaverToken: IssueNaverToken = async (code, state) => {
  const response = await fetch(
    `/api/auth/naverToken?naverState=${state}&naverCode=${code}`
  ).then((res) => res.json());
  return response;
};

export const getNaverId: getNaverId = async (token) => {
  const response = await fetch(
    `/api/auth/naverInfo?naverToken=${token}`,
    {}
  ).then((res) => res.json());
  return response;
};

export const checkEmailExists = async (email: string) => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.CheckEmailExists)), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => res.json());

  return response;
};

export const signUp = async (values: UserData) => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.SignUp)), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());

  return response;
};

export const signUpSocial = async (values: UserData) => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.SignUpSocial)), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());

  return response;
};

export const signIn = async (email: string, password: string) => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.SignIn)), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => res.json());

  if (response?.status === 200) {
    localStorage.setItem("login-token", response.data.token);
    window.location.href = "/";
  } else {
    alert(response.message);
  }
  return response.data;
};

export const signInSocial = async (id?: number | string, type?: string) => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.SignInSocial)), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      social_id: id?.toString(),
      type: type,
    }),
  }).then((res) => res.json());

  return response.data;
};

export const getUserInfo: getUserInfo = async () => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.Me)), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("login-token") || "",
    },
  }).then((res) => res.json());
  return response.data;
};

export const postProfileImg: postProfileImg = async (formData) => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.Image)), {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("login-token") || "",
    },
    body: formData,
  }).then((res) => res.json());

  return response.data;
};

export const updateUserInfo = async (
  id: number,
  name?: string,
  profile?: FormData | string
) => {
  let imageUrl = "";
  if (typeof profile === "object") {
    imageUrl = await postProfileImg(profile);
  }
  const response = await fetch(
    getDomain(toUrl(ApiRoutes.UpdateUser, { id: id })),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token") || "",
      },
      body: JSON.stringify({
        name: name,
        profile: imageUrl || profile,
      }),
    }
  ).then((res) => res.json());

  return response;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("login-token");
    queryClient
      .invalidateQueries({ queryKey: [toUrl(ApiRoutes.Me)] })
      .then(() => {
        window.location.reload();
      });
  };
};

// 토큰 체크
export const toCheckToken = () => {
  return localStorage.getItem("login-token") ?? null;
};

// 성별 선택
export const selectGender = (value: string) => {
  return value === "남자" ? true : false;
};

// 생년월일
export const toFormatBirth = (value: string) => {
  return value.slice(0, 4) + "-" + value.slice(4, 6) + "-" + value.slice(6);
};
