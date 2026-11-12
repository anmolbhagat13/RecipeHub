import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={
          <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
            <Login />
          </div>
        } />

        <Route path="/register" element={
          <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
            <Signup />
          </div>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
