import { GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/config/constants"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!
        }),

        GitHubProvider({
            clientId: GITHUB_ID!,
            clientSecret: GITHUB_SECRET!
        })
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async signIn({ account, profile }) {
            if (account && account.provider === "google") {
                console.log("Google provider triggered")
            }

            if (account && account.provider === "github") {
                console.log("Github provider triggered")
            }
            console.log("account", account)
            console.log("Profile", profile)
            return true
        }
    },

    pages: {
        signIn: "/auth/login",
        error: "/error"
    }
})

export { handler as GET, handler as POST }