import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface CustomJWT extends JWT {
  accessToken?: string;
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials in environment variables.");
}

const prisma = new PrismaClient();

// Funciones auxiliares
const createUserGroup = async (userId: string, userName: string | null) => {
  const newGroup = await prisma.group.create({
    data: {
      name: `Sala de ${userName || "User"}`,
      ownerId: userId,
    },
  });

  await prisma.groupUser.create({
    data: {
      userId,
      groupId: newGroup.id,
    },
  });
};

const createNewUser = async (userData: {
  name: string | null;
  email: string;
  image: string | null;
}) => {
  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      image: userData.image,
      password: null,
      emailVerified: null,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      isAdmin: true,
    },
  });
};

const handleGoogleSignIn = async (user: any) => {
  if (!user.email) {
    throw new Error("Email is required");
  }

  let existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    existingUser = await createNewUser({
      name: user.name,
      email: user.email,
      image: user.image,
    });

    if (!existingUser) {
      throw new Error("User creation failed");
    }

    const userGroups = await prisma.groupUser.findMany({
      where: { userId: existingUser.id },
    });

    if (userGroups.length === 0) {
      await createUserGroup(existingUser.id, existingUser.name);
    }
  }

  // Nueva lógica para usuarios con correo de dominio sigob
  if (user.email.endsWith("@sigob")) {
    await createSIGOBGroupIfNotExists();
    await assignUserToSIGOBGroup(existingUser.id);
  }

  return true;
};

const createSIGOBGroupIfNotExists = async () => {
  const existingGroup = await prisma.group.findFirst({
    where: { name: "SIGOB" },
  });

  if (!existingGroup) {
    await prisma.group.create({
      data: {
        name: "SIGOB",
      },
    });
  }
};

const assignUserToSIGOBGroup = async (userId: string) => {
  const sigobGroup = await prisma.group.findFirst({
    where: { name: "SIGOB" },
  });

  if (sigobGroup) {
    await prisma.groupUser.create({
      data: {
        userId,
        groupId: sigobGroup.id,
      },
    });
  }
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true,
          },
        });

        if (!user) {
          throw new Error("No se encontró el usuario");
        }
        if (!user.password) {
          throw new Error("La cuenta no tiene contraseña");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("La contraseña es incorrecta");
        }

        return user;
      },
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
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        id: token.sub as string,
        email: token.email as string,
        image: token.picture as string,
        name: token.name as string,
        emailVerified: token.email_verified as Date,
      };
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        return handleGoogleSignIn(user);
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
