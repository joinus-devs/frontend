import { NextAuth, DefaultSession, DefaultUser, Session } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined | null;
      uid?: string | undefined | null;
    } & DefaultSession["user"];
  }
  interface JWT {
    user?: {
      name?: string | undefined | null;
    };
  }
}
