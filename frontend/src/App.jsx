import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape.jsx";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";


// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
}

// Redirect to home page if user is authenticated
const RedirectAutenicatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if(isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-purple-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-indigo-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path='/' element={<ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>} />
        <Route
          path='/signup'
          element={
          <RedirectAutenicatedUser>
            <SignUpPage />
          </RedirectAutenicatedUser>
        } />
        <Route
          path='/login'
          element={
          <RedirectAutenicatedUser>
            <LoginPage />
          </RedirectAutenicatedUser>
        } />
        <Route path='/verify-email' element={<EmailVerificationPage/>} />
        <Route path='/forgot-password' element={<RedirectAutenicatedUser>
          <ForgotPasswordPage />
        </RedirectAutenicatedUser>} />
        
        <Route
          path='/reset-password/:token'
					element={<RedirectAutenicatedUser>
							<ResetPasswordPage />
						</RedirectAutenicatedUser>
					}
        />

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;