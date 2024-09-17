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

const PrivateRoute: React.FC = () => {
  // Access the authentication state from Zustand
  const { isAuthenticated } = useAuthStore();

  // If not authenticated, redirect to sign-in page
  return isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
};
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/overview" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/setting" element={<Setting />} />

          {/* Redirect root to /overview if authenticated */}
          <Route path="/" element={<Navigate to="/overview" />} />
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<Navigate to="/signIn" />} />
      </Routes>
    </>
  );
}

export default App;
