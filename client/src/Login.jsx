import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const ADMIN_EMAIL = 'admin@sevasahayog.org'
const ADMIN_PASSWORD = 'admin123'
const ADMIN_ROLE = 'admin'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'donor' })
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Admin hardcoded
    if (
      form.role === ADMIN_ROLE &&
      form.email === ADMIN_EMAIL &&
      form.password === ADMIN_PASSWORD
    ) {
      navigate('/admin')
      return
    }

    // Donor/Receiver mock check: accept any non-empty creds
    if (!form.email || !form.password) {
      setError('Please enter email and password')
      return
    }

    if (form.role === 'donor') navigate('/donor')
    else if (form.role === 'receiver') navigate('/receiver')
    else setError('Invalid role selected')
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-ink">Seva Sahayog</h1>
          <p className="text-slate-600">
            A minimal, modern portal to connect generous donors with authentic community needs. Blue, yellow, and white—calm, clear, and focused on impact.
          </p>
          <div className="flex gap-3">
            <div className="h-2 w-20 rounded bg-primary" />
            <div className="h-2 w-20 rounded bg-accent" />
            <div className="h-2 w-20 rounded bg-slate-200" />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
        >
          <h2 className="text-xl font-semibold text-ink mb-4">Login</h2>

          <label className="block text-sm text-slate-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="name@example.com"
          />

          <label className="block text-sm text-slate-700 mt-4 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="••••••••"
          />

          <label className="block text-sm text-slate-700 mt-4 mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="donor">Donor</option>
            <option value="receiver">Receiver</option>
            <option value="admin">Admin</option>
          </select>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-primary px-4 py-2 font-medium text-white hover:brightness-110"
          >
            Continue
          </button>

          <div className="mt-4 text-center text-sm text-slate-600">
            Not created an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>

          <div className="mt-6 rounded-lg bg-accent/20 p-3 text-sm text-ink">
            Admin demo: {ADMIN_EMAIL} / {ADMIN_PASSWORD}
          </div>
        </form>
      </div>
    </section>
  )
}
