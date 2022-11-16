import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({session, token, user }) {
      if (session && session.user)
        (session.user as any).role = (user as any).role; // Add role value to user object so it is passed along with session
      return session;
    }
  },
}

export default NextAuth(authOptions)
