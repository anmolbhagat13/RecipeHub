import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
                <Login />
              </div>
            }
          />

          <Route
            path="/register"
            element={
              <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
                <Signup />
              </div>
            }
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* We'll add your protected pages here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
