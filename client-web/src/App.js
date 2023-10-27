import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/Admin/Layout";
import AdminDashboard from "./Pages/AdminDashboard";
import AddAuthority from "./Components/Admin/AddAuthority";
import { ThemeProvider } from "@material-tailwind/react";
import LoginVerify from "./Components/Auth/LoginVerify";
import Verify from "./Components/Auth/Verify";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: LoginVerify,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Layout />,
    loader: () => {
      return Verify(5);
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "addauthority",
        element: <AddAuthority />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
  );
};

export default App;
