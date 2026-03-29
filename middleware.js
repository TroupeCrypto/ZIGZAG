import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const allowedGitHubLogin = process.env.ALLOWED_GITHUB_LOGIN?.toLowerCase()

const authMiddleware = withAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ token }) => {
      if (!allowedGitHubLogin) {
        return true
      }

      if (!token) {
        return false
      }

      return token.login?.toLowerCase() === allowedGitHubLogin
    },
  },
})

export default function middleware(req) {
  if (!allowedGitHubLogin) {
    return NextResponse.next()
  }

  return authMiddleware(req)
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)'],
}
