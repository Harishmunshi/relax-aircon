'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const params = useSearchParams()
  const next = params.get('next') ?? ''
  const [role, setRole] = useState<'admin' | 'technician'>(next.startsWith('/dashboard/technician') ? 'technician' : 'admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, password, next }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Login failed')
      window.location.assign(json.redirect)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <div className="field">
        <label htmlFor="role">I am</label>
        <select id="role" value={role} onChange={e => setRole(e.target.value as 'admin' | 'technician')}>
          <option value="admin">Owner / admin</option>
          <option value="technician">Technician</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <p className="notice notice-error" role="alert" style={{ margin: 0 }}>{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Checking' : 'Log in'}</button>
    </form>
  )
}
