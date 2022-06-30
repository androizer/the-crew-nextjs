import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

import { axiosInstance } from "../../../core/services";

import type { LoginResponse } from "./login/google";

type UserWithTokens = User & { tokens: LoginResponse };

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const googleUser = {
        email: user?.email,
        firstName: user?.name?.split(" ")[0],
        lastName: user?.name?.split(" ")[1],
        role: ["user"],
        meta: {
          googleId: user?.id,
          imgUrl: user?.image,
        },
      };
      const tokens = await getTokensFromAPIServer(googleUser);
      user.tokens = tokens;
      return true;
    },
    // This callback is called whenever a JSON Web Token is
    // created (i.e. at sign in) or updated (i.e whenever a
    // session is accessed in the client).
    async jwt({ token, user, account }) {
      // The arguments user, account, profile and isNewUser are only passed
      // the first time this callback is called on a new session, after the
      // user signs in. In subsequent calls, only token will be available.
      if (user && account) {
        const { tokens } = user as UserWithTokens;
        setTokens(token, tokens);
      } else {
        // Subsequent calls
        if (Date.now() > token.expiresAt!) {
          // Refresh token call
          return await refreshToken(token);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // The first invocation of this callback won't be having tokens property.
      // Hence, we will fetch the user via accessToken and store in user (merge and override).
      if (!session.tokens) {
        const user = await getUserFromAPIServer(token.accessToken);
        session.user = {
          ...session.user,
          ...user,
        };
        const { accessToken, refreshToken } = token;
        if (accessToken && refreshToken) {
          session.tokens = {
            accessToken,
            refreshToken,
          };
        }
      }
      return session;
    },
  },
});

async function getTokensFromAPIServer<T>(body: T) {
  const resp = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/login/google`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  const json = (await resp.json()) as LoginResponse;
  return json;
}

async function getUserFromAPIServer<T>(token: T): Promise<Session["user"]> {
  const { data } = await axiosInstance.getInstance().get(`/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function refreshToken(token: JWT) {
  const { data } = await axiosInstance.getInstance().post<LoginResponse>("token/refresh", {
    refreshToken: token.refreshToken,
  });
  if (data.accessToken && data.refreshToken) {
    setTokens(token, data);
  }
  return token;
}

function setTokens(token: JWT, payload: LoginResponse) {
  token.accessToken = payload.accessToken;
  token.refreshToken = payload.refreshToken;
  token.expiresAt = payload.expiresAt;
  axiosInstance.getInstance().defaults.headers.common[
    "Authorization"
  ] = `Bearer ${payload.accessToken}`;
}
