import "./App.css";
import LoginForm from "./components/LoginForm";
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
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
