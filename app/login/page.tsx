import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Staff login',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 420 }}>
        <p className="brand" style={{ marginBottom: 24 }}>Relax Aircon</p>
        <h1 style={{ fontSize: '1.8rem' }}>Staff login</h1>
        <div className="panel">
          <Suspense fallback={<div className="skeleton" style={{ height: 180 }} />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
