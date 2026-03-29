import { withAuth } from 'next-auth/middleware'

const normalizeGitHubLogin = (value) => {
  const normalized = value?.trim().toLowerCase()
  return normalized === '' ? undefined : normalized
}
const allowedGitHubLogin = normalizeGitHubLogin(process.env.ALLOWED_GITHUB_LOGIN)

const authMiddleware = withAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ token }) => {
      if (!allowedGitHubLogin) {
        return false
      }

      if (!token) {
        return false
      }

      return normalizeGitHubLogin(token.login) === allowedGitHubLogin
    },
  },
})

export default function middleware(req) {
  return authMiddleware(req)
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)'],
}
