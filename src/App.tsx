import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import Analyze from "./components/Analyze";

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
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "history",
          element: (
            <ProtectedRoute>
              <Analyze />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
