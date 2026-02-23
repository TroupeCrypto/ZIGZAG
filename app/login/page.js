'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <main className="container">
      <section className="section" style={{ textAlign: 'center' }}>
        <h1 className="section-title">Sign in to ZIG ZAG Hub</h1>
        <p style={{ marginBottom: '24px' }}>Use the authorized GitHub account to continue.</p>
        <button className="btn-primary" onClick={() => signIn('github', { callbackUrl: '/' })}>
          Continue with GitHub
        </button>
      </section>
    </main>
  )
}
