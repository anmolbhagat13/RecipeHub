import { Link } from 'react-router-dom'

const Login = () => {
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

      <form className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Login
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
