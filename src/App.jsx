import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import DashBaord from "./components/DashBaord";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify_emaile' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/dashboard' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<>
			<div className='min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden'>
				{/* Floating Shapes */}
				<FloatingShape color="bg-white" size="w-64 h-64" top="-5%" left="10%" delay={0} />
				<FloatingShape color="bg-gray-400" size="w-48 h-48" top="70%" left="80%" delay={5} />
				<FloatingShape color="bg-gray-300" size="w-32 h-32" top="40%" left="-10%" delay={2} />

				<Routes>
					<Route path="/" element={<Home />} />
					{/* Nested route for dashboard */}
					<Route path="/dashboard/*" element={<ProtectedRoute><DashBaord /></ProtectedRoute>} />

					<Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
					<Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
					<Route path="/forget_password" element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
					<Route path='/verify_emaile' element={<EmailVerificationPage />} />
					<Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
					{/* catch all routes */}
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
				<Toaster />
			</div>
		</>
	);
}

export default App;