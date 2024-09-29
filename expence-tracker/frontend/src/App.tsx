import { useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import SignIn from "./pages/auth/signIn";
import Transactions from "./pages/transactions";
import SignUp from "./pages/auth/signUp";
import Overview from "./pages/overview";
import Dashboard from "./pages/dashboard";
import Setting from "./pages/setting";
import useAuthStore from "./store/authStore";
import { isAuthenticated_token } from "./lib/isAuthenticated";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Account from "./pages/account";

const PrivateRoute: React.FC = () => {
  // Access the authentication state from Zustand
  const { isAuthenticated } = useAuthStore();

  // If not authenticated, redirect to sign-in page
  return isAuthenticated_token() ? <Outlet /> : <Navigate to="/signIn" />;
};
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/overview" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/account" element={<Account />} />

          <Route path="/setting" element={<Setting />} />

          {/* Redirect root to /overview if authenticated */}
          <Route path="/" element={<Navigate to="/overview" />} />
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
