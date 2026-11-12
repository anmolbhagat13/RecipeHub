import { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    const {
      fullname,
      username,
      email,
      password,
      confirmPassword
    } = formData

    // Check for empty fields
    if (!fullname.trim() || !username.trim() || !email.trim() ||
        !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    // Check password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSuccess('Form validation successful!')
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">
          RecipeHub 🍳
        </h1>

        <p className="text-gray-500 mt-2">
          Join our community of food lovers.
        </p>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* Email */}
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-16 outline-none focus:border-orange-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-orange-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-16 outline-none focus:border-orange-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-orange-600"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-sm">
            {success}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Create Account
        </button>

      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?

        <Link
          to="/login"
          className="text-orange-600 font-semibold ml-1 hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  )
}

export default Signup
