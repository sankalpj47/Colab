import {
  BASE_BACKEND_URL,
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/config/constants";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";

interface AuthProfile {
  name?: string;
  email?: string;
  picture?: string;
  avatar_url?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: GITHUB_ID!,
      clientSecret: GITHUB_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ account, profile }) {
      try {
        const imageUrl =
          account?.provider === "google"
            ? (profile as AuthProfile)?.picture
            : (profile as AuthProfile)?.avatar_url;

        const response = await axios.post(`${BASE_BACKEND_URL}/auth/register`, {
          name: profile?.name,
          email: profile?.email,
          provider: account?.provider?.toUpperCase(),
          imageUrl: imageUrl || "",
        });

        if (account) {
          account.backendToken = response.data.token;
        }

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    async jwt({ token, account, profile }) {
      if (account?.backendToken) {
        token.accessToken = account.backendToken as string;
      }
      // Store image on first sign in
      if (profile) {
        token.image =
          (profile as AuthProfile)?.picture || (profile as AuthProfile)?.avatar_url || null;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.image = token.image as string;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/error",
  },
});

export { handler as GET, handler as POST };
