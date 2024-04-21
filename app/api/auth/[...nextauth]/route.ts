import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // check to see if email and password is there
          if (!credentials!.email || !credentials!.password) {
            throw new Error("Please enter an email and password");
          }

          // check to see if user exists
          const user = await prisma.user.findUnique({
            where: {
              email: credentials!.email,
            },
          });

          // if no user was found
          if (!user || !user?.hashedPassword) {
            throw new Error("No user found");
          }

          // check to see if password matches
          const passwordMatch = await compare(
            credentials!.password,
            user.hashedPassword
          );

          // if password does not match
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return {
            ...user,
            id: user.id.toString(),
          };
        } catch (error) {
          console.log("Error: ", error);

          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);

