import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
