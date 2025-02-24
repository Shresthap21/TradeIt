import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import useUserUtility from "./utils/useUserUtility";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute";
import Watchlist from "./pages/Watchlist";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Performance from "./pages/Performance";
import SigninProtectedRoute from "./utils/SigninProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import BreadthIndicators from "./pages/BreadthIndicators";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import BreakoutStrategy from "./pages/BreakoutStrategy";

const AppRoutes = () => {
  useUserUtility(); // Moved here, inside the Router context
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SigninProtectedRoute>
            <HomePage />
          </SigninProtectedRoute>
        }
      />
      <Route
        path="/breadth-indicators"
        element={
          <ProtectedRoute>
            <BreadthIndicators />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/performance"
        element={
          <ProtectedRoute>
            <Performance />
          </ProtectedRoute>
        }
      />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/tag/:tag" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route
        path="/breakout-strategy"
        element={
          <ProtectedRoute>
            <BreakoutStrategy />
          </ProtectedRoute>
        }
      />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <Toaster />
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </Router>
  );
}

export default App;
