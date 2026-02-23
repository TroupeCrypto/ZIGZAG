import { withAuth } from 'next-auth/middleware'

const allowedGitHubLogin = process.env.ALLOWED_GITHUB_LOGIN?.toLowerCase()

export default withAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ token }) => {
      if (!token || !allowedGitHubLogin) {
        return false
      }

      return token.login?.toLowerCase() === allowedGitHubLogin
    },
  },
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)'],
}
