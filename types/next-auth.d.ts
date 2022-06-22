import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      lastName?: string;
      firstName?: string;
    } & DefaultUser;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    expiresAt: number;
    accessToken: string;
    refreshToken: string;
  }
}