import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'donor' })
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please enter email and password')
      return
    }
    if (form.role === 'admin') {
      setError('Admin cannot sign up. Use Login with admin credentials.')
      return
    }
    if (form.role === 'donor') navigate('/donor')
    else if (form.role === 'receiver') navigate('/receiver')
    else setError('Select a valid role')
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-ink">Join Seva Sahayog</h1>
          <p className="text-slate-600">
            Create a Donor or Receiver account. Admin signup is disabled; admins use dedicated credentials to log in.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
        >
          <h2 className="text-xl font-semibold text-ink mb-4">Sign up</h2>

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
            placeholder="Create a strong password"
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
            {/* Admin intentionally excluded in signup */}
          </select>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-primary px-4 py-2 font-medium text-white hover:brightness-110"
          >
            Create account
          </button>

          <div className="mt-4 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
