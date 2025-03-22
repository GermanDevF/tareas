import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

interface CustomSession extends Session {
  accessToken?: string;
}

interface CustomJWT extends JWT {
  accessToken?: string;
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials in environment variables.");
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token as CustomJWT;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomJWT;
    }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
