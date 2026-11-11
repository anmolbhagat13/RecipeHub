import { useState } from 'react'

const App = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo and heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">
            RecipeHub 🍳
          </h1>

          <p className="text-gray-500 mt-2">
            {isLogin
              ? 'Welcome back! Sign in to continue.'
              : 'Join our community of food lovers.'}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          )}

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

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          )}

          <button
            type="button"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>

        </form>

        {/* Toggle authentication mode */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 font-semibold ml-1 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

      </div>
    </div>
  )
}

export default App
