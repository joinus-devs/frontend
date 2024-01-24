import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider, { NaverProfile } from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { AdapterUser } from "next-auth/adapters";

export const authOptions = {
  // export default NextAuth({
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { type: "text", placeholder: "아이디" },
    //     password: { type: "password", placeholder: "비밀번호" },
    //   },

    //   async authorize(credentials) {
    //     const res = await fetch("http://localhost:3000/auth/signin", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(credentials),
    //     });
    //     const user = await res.json();
    //     console.log("signin");
    //     console.log(user);

    //     if (res.ok && user) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),

    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // session: {
  //   strategy: "jwt",
  //   maxAge: 3 * 24 * 60 * 60,
  // },

  callbacks: {
    // jwt: async ({ token, user }: { token: any; user: any; session: any }) => {
    //   if (user) {
    //     token.user = {};
    //     token.user.id = user.id;
    //     token.user.name = user.name;
    //   }
    //   return token;
    // },
    // session: async ({ session, token }: { session: any; token: any }) => {
    //   session.user = token.user;
    //   return session;
    // },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
// });

export default NextAuth(authOptions);
