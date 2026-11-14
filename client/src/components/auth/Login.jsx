import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  // Store form data in state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Store error and loading state
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if(!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Redirect after successful login
      navigate('/')
    } catch (error) {
      setError(error.message || 'Unable to connect to the server.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">
          RecipeHub 🍳
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Sign in to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm"> {error} </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?

        <Link
          to="/register"
          className="text-orange-600 font-semibold ml-1 hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </div>
  )
}

export default Login
