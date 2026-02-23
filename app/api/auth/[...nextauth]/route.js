import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ profile }) {
      const allowedGitHubLogin = process.env.ALLOWED_GITHUB_LOGIN

      if (!allowedGitHubLogin) {
        return false
      }

      return profile?.login?.toLowerCase() === allowedGitHubLogin.toLowerCase()
    },
    async jwt({ token, profile }) {
      if (profile?.login) {
        token.login = profile.login
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && token.login) {
        session.user.login = token.login
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
